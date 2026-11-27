## Motivation: Holding a Sequencer in My Hand

The idea for this project began at an Imperial College London departmental talk where an Oxford Nanopore Technologies speaker passed a **MinION** around the lecture theatre. Holding a complete DNA and RNA sequencer that weighed under 100 grams and plugged into a standard laptop over USB changed how I thought about genomics. Unlike short-read sequencing-by-synthesis instruments that rely on cyclic fluorescence imaging inside heavy benchtop optics, a nanopore device directly measures the physics of a single biopolymer passing through a molecular aperture in real time.

<figure class="my-8 flex flex-col items-center">
  <img src="/blogs/nanopore-basecalling/minion.jpg" alt="Oxford Nanopore MinION Portable Sequencer" class="rounded-xl shadow-md max-w-full md:max-w-xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 1: The Oxford Nanopore MinION portable sequencer, capable of streaming raw picoampere ionic current traces in real time over USB.
  </figcaption>
</figure>

When a voltage bias is applied across an electrically resistant membrane containing a biological nanopore (such as an engineered *E. coli* CsgG or MspA pore paired with an ATP-driven helicase motor protein), an open-pore ionic current flows through the channel. As single-stranded DNA ratchets through the pore constriction at roughly $400\text{ to }450\text{ bases per second}$, the bulky nucleotides partially occlude the ionic pathway.

The narrowest sensing region of the pore accommodates roughly $k = 5$ nucleotides at any instant. An acquisition ASIC sampling at $4\text{ kHz}$ does not read isolated `A`, `C`, `G`, or `T` bases; instead, it measures noisy current plateaus corresponding to $4^5 = 1,024$ overlapping 5-mer contexts, complicated by stochastic motor-protein dwell times (typically 8 to 15 samples per base event), baseline drift, and capacitive sensor noise.

Modern production basecallers from Oxford Nanopore (from early hidden Markov and recurrent models such as Metrichor, Nanocall, Scrappie, Flappie, and Guppy through to Bonito and Dorado) have progressively shifted toward convolutional, recurrent, and Conditional Random Field / Connectionist Temporal Classification (CRF-CTC) neural networks. To understand the underlying signal-to-sequence mathematics from first principles, I set out to engineer a complete **1,025-state Hidden Markov Model (HMM) basecaller** from scratch in Python, accelerated with **Numba JIT multi-core compilation** on raw human `.pod5` sequencing reads.

---

## 1. POD5 Ingestion and Multi-Stage Signal Conditioning

In 2023, Oxford Nanopore transitioned raw signal storage from legacy HDF5-based `.fast5` files to the Apache Arrow-backed **POD5** format, separating read metadata, calibration tables, and compressed 16-bit integer ADC signal chunks for high-throughput streaming I/O.

<figure class="my-8 flex flex-col items-center">
  <img src="/blogs/nanopore-basecalling/pod5_file_structure.png" alt="POD5 Apache Arrow Internal File Structure" class="rounded-xl shadow-md max-w-full md:max-w-2xl h-auto border border-border bg-white p-2" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 2: Internal Apache Arrow table architecture of a POD5 sequencing archive, separating read metadata from compressed 16-bit raw signal chunks.
  </figcaption>
</figure>

In `pod5_data_loader.py`, I implemented a context-managed `Pod5DataLoader` class around `pod5.Reader` to stream individual reads (specifically benchmarking on human reference read `2536858a-ed8f-4e09-8dfe-15d7e2dd57c9` from the GIAB `HG002_raw_read.pod5` dataset, sampled at $f_s = 4,000\text{ Hz}$) without loading multi-gigabyte runs into memory.

Before an HMM can evaluate Gaussian emission likelihoods across $1,024$ 5-mer states, the raw ionic current trace must be stripped of open-pore entry spikes, low-frequency thermal drift, and scale offsets. In `signal_preprocessor.py`, I built a five-stage preprocessing pipeline (`SignalPreprocessor`):

1. **Interquartile Outlier Clipping ($3\times\text{IQR}$):** Transient current spikes caused by pore gating or mechanical disturbances are clamped to $[Q_{25} - 3\cdot\text{IQR},\; Q_{75} + 3\cdot\text{IQR}]$.
2. **Non-Linear Median Filtering:** A 5-point sliding median filter (`scipy.signal.medfilt`, kernel size 5) suppresses single-sample impulse noise while preserving sharp step edges between consecutive k-mer translocation plateaus.
3. **Polynomial Baseline Drift Subtraction:** Over tens of thousands of samples, electrode polarisation induces slow baseline wander. Fitting and subtracting a 3rd-degree polynomial ($p(t) = a_3 t^3 + a_2 t^2 + a_1 t + a_0$ via `np.polyfit`) levels the entire trace.
4. **Robust Z-IQR Normalisation:** Because remaining tail outliers can skew standard mean/variance scaling, the signal is standardised via `RobustScaler`:
   $$\tilde{x}_t = \frac{x_t - \text{median}(x)}{\text{IQR}(x)}$$
5. **Derivative Change-Point Event Segmentation:** To identify discrete translocation events for exploratory signature analysis, `segment_events()` computes first-order sample differences $\Delta \tilde{x}_t = |\tilde{x}_{t} - \tilde{x}_{t-1}|$ and flags step boundaries exceeding $2.0 \times \text{MAD}(\Delta \tilde{x})$ with a minimum dwell enforcement of 5 samples.

<figure class="my-8 flex flex-col items-center">
  <img src="/blogs/nanopore-basecalling/signal_preprocessing.jpg" alt="Raw vs Preprocessed Nanopore Ionic Current Trace" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 3: Five-stage signal conditioning in SignalPreprocessor: raw 4 kHz POD5 ionic current trace vs outlier-clipped, median-filtered, drift-corrected, and RobustScaler-normalised output.
  </figcaption>
</figure>

---

## 2. Exploratory 6-Feature Event Clustering (`BaseSignatureAnalyzer`)

To test whether segmented current plateaus carry sufficient statistical structure to separate nucleotide families prior to full Markov decoding, I wrote `base_signature_analyzer.py` (`BaseSignatureAnalyzer`). For every segmented translocation plateau, the analyser extracts a 6-dimensional feature vector:
$$\mathbf{f}_i = \big[\mu_i,\; \sigma_i,\; d_i,\; \text{median}_i,\; \text{skewness}_i,\; \text{kurtosis}_i\big]$$
where $d_i$ is the event dwell duration in samples. Projecting the standardised feature matrix onto its top principal components (`PCA`) and running Ward hierarchical linkage clustering (`scipy.cluster.hierarchy.linkage`) confirmed that purine-rich and pyrimidine-rich 5-mer contexts separate along PC1 (dominated by mean and median current occlusion level), whereas homopolymer runs and fast transitions separate along PC2 (driven by dwell duration and higher-order tail moments). Single-event clustering alone cannot resolve overlapping 5-mers with nearly identical mean current levels; doing so requires enforcing the sequential k-mer grammar of DNA translocation.

---

## 3. Two-Pass Multiprocessing DTW Signal-to-Reference Alignment

Initializing a 1,025-state HMM with random Gaussian emissions fails because the 1,024 5-mer states are symmetric up to permutation without a physical pore prior. Conversely, directly adopting static lookup tables (such as Oxford Nanopore's R9.4 `nanopolish_5mer_model.txt`) leaves residual scaling discrepancies against normalised POD5 signals.

To bridge this gap, I built `signal_aligner.py` (`SignalAligner`) to align the preprocessed read against the **GRCh38 Human Chromosome 22 reference genome** (`NC_000022.11`) and extract empirical per-5-mer emission distributions before running Baum-Welch refinement:

<figure class="my-8 flex flex-col items-center">
  <img src="/blogs/nanopore-basecalling/dtw_pca_analysis.png" alt="Two-Pass Multiprocessing DTW Search and 6-Feature Event PCA Projection" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 4: Left: Two-pass coarse-to-fine multiprocessing Dynamic Time Warping (DTW) search across human chromosome 22 (NC_000022.11), pinpointing the read origin near 38,010,200 bp. Right: 6-feature PCA event projection from BaseSignatureAnalyzer.
  </figcaption>
</figure>

1. **Expected Reference Current Synthesis:** Using `nanopolish_5mer_model.txt` (which tabulates expected picoampere mean and standard deviation for all $1,024$ 5-mers), `SignalAligner` converts candidate genomic windows into synthetic expected current traces and normalises them with the same `RobustScaler`.
2. **Dynamic Physical Downsampling:** Because the pore samples at $4,000\text{ Hz}$ while DNA translocates at roughly $450\text{ bp/s}$, each nucleotide spans an average of $4000 / 450 \approx 8.89$ raw samples. `SignalAligner` downsamples the query trace by this physical translocation ratio during genomic search so that one downsampled signal step corresponds approximately to one reference k-mer step.
3. **Zero-Copy Two-Pass `multiprocessing` DTW Search:** Scanning a 50-megabase chromosome with Dynamic Time Warping is computationally intensive. To avoid pickling the reference chromosome across worker processes on every task submission, I used a module-level worker initialiser (`_init_worker`) that binds the reference array and pore lookup table in shared worker memory once, then distributes sliding windows across all CPU cores via `Pool.imap_unordered`:
   - **Pass 1 (Coarse Scan):** Evaluates fast downsampled DTW (`fastdtw`, radius 1) across coarse genomic windows around chromosome 22 offset `38,010,000 bp` to locate the minimum-cost region.
   - **Pass 2 (Fine Refinement):** Zooms into the winning locus with fine window strides, computing the full sample-to-k-mer warp path that assigns empirical current observations to their ground-truth 5-mer states.

---

## 4. The 1,025-State Sparse HMM Topology and Log-Space Numba Kernels

In `hmm_basecaller.py` (`HMMBasecaller`), the state space consists of $N = 1,025$ discrete hidden states:
- **States $0 \dots 1,023$:** Every canonical 5-mer from `AAAAA` ($0$) to `TTTTT` ($1,023$) in lexicographical base-4 order.
- **State $1,024$ (`UNK`):** A catch-all background state initialised to $\mathcal{N}(0, 1)$ that absorbs unaligned linkers, abasic stalls, or residual sensor glitches without forcing valid 5-mer Gaussians to widen excessively.

### Enforcing Sparse Step-1 DNA Translocation Grammar

A dense $1,025 \times 1,025$ transition matrix contains $N^2 = 1,050,625$ entries per time step. However, as DNA advances by one nucleotide through the pore constriction, a 5-mer $s_i = b_1 b_2 b_3 b_4 b_5$ can physically transition only to:
1. **Itself ($s_j = s_i$):** The helicase motor dwells on the same 5-mer across multiple $4\text{ kHz}$ clock ticks ($p_{\text{stay}} = 0.50$).
2. **Four Overlapping Step-Forward Successors ($s_j = b_2 b_3 b_4 b_5 x$, where $x \in \{\text{A, C, G, T}\}$):** The strand shifts forward by 1 base, preserving a 4-base prefix-suffix overlap:
   $$p_{\text{step}} = \frac{1 - p_{\text{stay}} - p_{\text{to\_unknown}}}{4} = \frac{1 - 0.50 - 0.05}{4} = 0.1125$$
3. **The Catch-All Unknown State ($s_{1024}$):** An escape transition $p_{\text{to\_unknown}} = 0.05$.

By pre-computing typed `numba.typed.List` predecessor and successor adjacency lists (`valid_predecessors_list` and `valid_successors_list`) where entries below `LOG_ZERO_THRESHOLD` are pruned, the per-sample transition complexity drops by more than **200-fold**, from $O(N^2) = 1,050,625$ to $O(6N) \approx 6,150$ operations per time step.

<figure class="my-8 flex flex-col items-center">
  <img src="/blogs/nanopore-basecalling/hmm_viterbi_overview.png" alt="Viterbi MAP 5-mer Decoding and Baum-Welch Learned Gaussian Emission Posteriors" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 5: Left: Viterbi maximum a posteriori (MAP) 5-mer state path overlaid on the preprocessed 4 kHz HG002 ionic current trace. Right: Baum-Welch refined Gaussian emission densities illustrating homopolymer overlap vs mixed purine/pyrimidine separation.
  </figcaption>
</figure>

### Preventing Underflow via Numba Log-Sum-Exp (`_logsumexp_jit`)

In a read spanning $T = 50,000$ samples, multiplying emission densities $b_j(x_t) = \mathcal{N}(x_t \mid \mu_j, \sigma_j^2)$ along any state path drives the joint likelihood $\prod_{t=1}^T b_{s_t}(x_t)$ below $10^{-308}$ within a few hundred samples, underflowing IEEE-754 double precision to zero.

To preserve numerical stability across arbitrarily long batches, every kernel in `hmm_basecaller.py` (`_forward_pass_log_jit`, `_backward_pass_log_jit`, `_baum_welch_step_log_jit`, and `_viterbi_decode_jit`) operates strictly in natural log-space (`float32` / `float64`) using a JIT-compiled log-sum-exp primitive:

```python
@njit(fastmath=True)
def _logsumexp_jit(log_probs):
    max_val = -np.inf
    for i in range(len(log_probs)):
        if log_probs[i] > max_val:
            max_val = log_probs[i]
    if np.isneginf(max_val):
        return -np.inf
    sum_exp = 0.0
    for i in range(len(log_probs)):
        if not np.isneginf(log_probs[i]):
            sum_exp += np.exp(log_probs[i] - max_val)
    return max_val + np.log(sum_exp)
```

In the log-forward pass, each state's forward variable $\alpha_t(j) = \log P(x_{1:t}, S_t = j \mid \theta)$ is parallelised across states via `numba.prange`, iterating only over that state's valid predecessors $\mathcal{P}(j)$:
$$\alpha_t(j) = \log b_j(x_t) + \underset{i \in \mathcal{P}(j)}{\text{logsumexp}}\Big(\alpha_{t-1}(i) + \log A_{ij}\Big)$$

During the **50,000-sample batched Baum-Welch Expectation-Maximisation (EM)** loop (`batch_size = 50000`, `num_iterations = 5`), the posterior state occupancy $\log \gamma_t(i)$ and pairwise transition posteriors $\log \xi_t(i, j)$ are accumulated in log-space, clipped at `MAX_CLIP_LOG_VAL` before exponentiation to prevent overflow, and used to update the emission parameters $(\mu_i, \sigma_i)$ with an enforced variance floor $\sigma_i \ge 0.20$ so rarely visited 5-mers never collapse into Dirac spikes.

---

## 5. Downsampled Viterbi Traceback and Dorado Benchmark Evaluation

Storing a full $T \times 1,025$ Viterbi backpointer matrix on a 300,000-sample read consumes over $1.2\text{ GB}$ of contiguous RAM per read. Because the average k-mer dwell duration at $4\text{ kHz}$ is roughly 9 samples, I introduced a configurable `viterbi_downsample_factor = 4` during Viterbi decoding (`_viterbi_decode_jit`), reducing memory footprint and traceback time by $4\times$ while preserving multi-sample resolution within every translocation plateau:
$$V_t(j) = \log b_j(x_t) + \max_{i \in \mathcal{P}(j)}\Big(V_{t-1}(i) + \log A_{ij}\Big), \quad \psi_t(j) = \arg\max_{i \in \mathcal{P}(j)}\Big(V_{t-1}(i) + \log A_{ij}\Big)$$

During sequence assembly (`decode()`), consecutive identical states ($S_t = S_{t-1}$) and visits to state $1,024$ (`UNK`) are collapsed, and each newly entered 5-mer appends its terminal nucleotide (`kmer[-1]`) to reconstruct the basecalled DNA read.

### Benchmarking Against Oxford Nanopore Dorado (`evaluate_accuracy.py`)

To evaluate the decoded FASTA output (`basecalled_output.fasta`) against an industrial gold standard, I ran Oxford Nanopore's production C++/CUDA **Dorado** basecaller (`dna_r10.4.1_e8.2_400bps_hac@v5.0.0`) on the exact same `HG002_raw_read.pod5` signal and wrote `evaluate_accuracy.py` using Biopython's `Bio.Align.PairwiseAligner` (global alignment mode with match score $+2$, mismatch penalty $-1$, gap-open penalty $-2$, and gap-extend penalty $-0.5$).

| Evaluation Metric | Custom 1,025-State Numba HMM | Production Neural Basecaller (Dorado HAC) |
| :--- | :--- | :--- |
| **State / Model Architecture** | 1,024 5-mers + 1 `UNK` state, sparse $O(6N)$ transitions | Deep CRF-CTC / Conformer neural network |
| **Training & Initialization** | Two-pass DTW on `NC_000022.11` + 50k-sample batched Baum-Welch EM | Supervised training across millions of reference reads |
| **Global Sequence Identity vs Dorado** | **81.0% validated sequence identity** | Baseline reference standard (99%+ raw Q20+ accuracy) |
| **Primary Error Mode** | Homopolymer run-length collapse (`AAAAA`) & skipped single-base transitions | Rare systematic modification or high-length homopolymer indels |

---

## 6. Architectural Limitations and Why Deep Learning Took Over

Reaching **81% sequence identity** against Dorado using a first-principles Hidden Markov Model written in pure Python and Numba highlighted both the mathematical elegance and the fundamental physical ceilings of classical Markov basecallers:

<figure class="my-8 flex flex-col items-center">
  <img src="/blogs/nanopore-basecalling/basecalling_timeline.png" alt="Evolution of Oxford Nanopore Basecalling Architectures" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 6: Architectural evolution of nanopore basecallers from early event-segmented Hidden Markov Models (Metrichor, Nanocall) to raw-signal recurrent, convolutional, and CRF-CTC neural architectures (Scrappie, Guppy, Bonito, Dorado).
  </figcaption>
</figure>

1. **The Homopolymer Dwell Problem:** When a long homopolymer such as `AAAAAAA` passes through the pore, the 5-mer occupying the constriction remains `AAAAA` across several consecutive nucleotide steps. Because the ionic current remains flat and the first-order HMM models dwell duration geometrically via a single self-loop probability $p_{\text{stay}} = 0.50$, Viterbi collapsing merges identical consecutive 5-mer states into a single 5-base motif, producing deletion errors in homopolymer tracts. Early neural models such as **Scrappie** introduced run-length transducer states, while modern **Bonito** and **Dorado** models use CRF-CTC blank tokens and wide receptive-field convolutions to count subtle helicase step ripples inside flat current plateaus.
2. **Context Width Beyond $k = 5$:** In R9.4 and dual-constriction R10.4.1 pores, up to 7 to 9 nucleotides influence the electric field simultaneously. Scaling a discrete HMM from $k = 5$ ($1,024$ states) to $k = 8$ ($4^8 = 65,536$ states) causes a combinatorial explosion in transition tables, whereas neural encoders represent wide sequence contexts in continuous latent embeddings.
3. **Skip and Stay Frame Shifts:** If the helicase steps across two bases faster than the downsampled Viterbi stride, a strictly step-1 transition graph ($b_1 b_2 b_3 b_4 b_5 \to b_2 b_3 b_4 b_5 x$) must either pay an `UNK` penalty or misalign by a local substitution until the path re-synchronises. Adding explicit step-2 ($16$ branches per state) and back-slip transitions improves recall at the cost of expanding the sparse adjacency list from $6$ to $22$ edges per state.

Building the entire pipeline from raw Apache Arrow `.pod5` bytes through DTW reference alignment, log-space Numba forward-backward kernels, and Viterbi decoding gave me a hands-on appreciation for the signal processing and probabilistic modelling challenges at the heart of third-generation sequencing. The complete source code is available in my [nanopore-basecalling-project GitHub repository](https://github.com/aahmeddev/nanopore-basecalling-project).
