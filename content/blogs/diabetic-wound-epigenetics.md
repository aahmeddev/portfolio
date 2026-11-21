## 1. Clinical Context: Why Diabetic Ulcers Fail to Remodel Extracellular Matrix

Chronic non-healing foot ulcers affect roughly 15% to 25% of patients with diabetes mellitus and remain the leading cause of non-traumatic lower-limb amputation worldwide. In healthy cutaneous wound repair, dermal fibroblasts proliferate, migrate into the provisional fibrin clot, and synthesise type I collagen (*COL1A1*) to restore tensile strength. Under chronic hyperglycaemia, however, dermal fibroblasts frequently enter premature stress-induced **cellular senescence**, switching from an anabolic matrix-depositing phenotype to a catabolic, pro-inflammatory **Senescence-Associated Secretory Phenotype (SASP)**.

In this Imperial College London molecular and cellular bioengineering study (awarded **84.38%**), we investigated whether sustained high-glucose exposure drives **epigenetic CpG hypermethylation** of the *COL1A1* promoter alongside coordinated transcriptional shifts across matrix metalloproteinase (*MMP1*), reactive oxygen species (*NOX4*), and inflammatory cytokine (*IL6*) pathways.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/diabetic-wound-epigenetics/cpg_methylation_summary.png" alt="COL1A1 Promoter CpG Bisulphite Methylation and RT-PCR Transcriptional Remodelling" class="rounded-xl shadow-md max-w-full md:max-w-4xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 1: Left: Bisulphite sequencing CpG methylation profile across the human COL1A1 promoter comparing 5 mM normoglycaemic control clones against 80.5 mM hyperglycaemic fibroblast clones (mean methylation rising from 13.1% to 36.4%, p = 0.002). Right: Semi-quantitative RT-PCR transcript shifts normalised to GAPDH.
  </figcaption>
</figure>

---

## 2. Wet-Lab Protocol: 14-Day Hyperglycaemic Fibroblast Culture and 35-Cycle RT-PCR

Primary human dermal fibroblasts were cultured for 14 days across two parallel experimental arms:
- **Normoglycaemic Control Cohort:** Standard physiological glucose medium ($5.0\text{ mM}$ D-glucose).
- **Hyperglycaemic Diabetic-Mimetic Cohort:** High-glucose medium ($80.5\text{ mM}$ D-glucose) simulating severe chronic hyperglycaemic metabolic stress.

Following the 14-day exposure period, total cellular RNA was isolated using **Qiagen RNeasy Plus Mini spin columns** with genomic DNA Eliminator columns to prevent gDNA amplification artefacts. First-strand complementary DNA (cDNA) was reverse-transcribed using **SuperScript IV Reverse Transcriptase** and oligo(dT) primers, followed by **35-cycle semi-quantitative PCR** targeting five gene loci:
1. ***COL1A1* (Pro-Alpha 1 Type I Collagen):** Core structural extracellular matrix protein of the dermis.
2. ***MMP1* (Interstitial Collagenase-1):** Cleaves triple-helical type I, II, and III collagens.
3. ***NOX4* (NADPH Oxidase 4):** Primary enzymatic source of intracellular superoxide and hydrogen peroxide ($\text{H}_2\text{O}_2$) in senescent fibroblasts.
4. ***IL6* (Interleukin-6):** Canonical SASP paracrine inflammatory cytokine that prolongs macrophage infiltration.
5. ***GAPDH* (Glyceraldehyde-3-Phosphate Dehydrogenase):** Constitutive housekeeping loading control.

<figure class="my-8 flex flex-col items-center">
  <img src="/portfolio/projects/diabetic-wound-epigenetics/rtpcr_gel_results.jpg" alt="2% Agarose Gel Electrophoresis of 35-Cycle RT-PCR Amplicons (Group 7)" class="rounded-xl shadow-md max-w-full md:max-w-3xl h-auto border border-border" />
  <figcaption class="text-center text-sm text-muted-foreground mt-3">
    Figure 2: UV transilluminator image of our 2% agarose gel electrophoresis (Group 7 results) resolving 35-cycle RT-PCR amplicons for COL1A1, MMP1, NOX4, IL6, and GAPDH housekeeping controls across normoglycaemic (5 mM) and hyperglycaemic (80.5 mM) human dermal fibroblasts.
  </figcaption>
</figure>

Densitometric band quantification normalised against *GAPDH* confirmed a coherent senescent transcriptional switch: high-glucose fibroblasts exhibited marked suppression of *COL1A1* mRNA alongside robust induction of *MMP1*, *NOX4*, and *IL6*.

---

## 3. Sodium Bisulphite Sequencing of the *COL1A1* Promoter (`p = 0.002`)

To test whether the transcriptional silencing of *COL1A1* was stabilized by an epigenetic mechanism (which persists even after transient glycaemic normalisation, a phenomenon known clinically as **metabolic memory**), genomic DNA from both cohorts underwent **sodium bisulphite conversion**.

Sodium bisulphite selectively deaminates unmethylated cytosine residues into uracil (which amplify as thymine `T` during subsequent PCR), whereas **5-methylcytosine (5-mC)** resists deamination and remains cytosine (`C`). We amplified the CpG-rich proximal promoter region of *COL1A1*, cloned the PCR products into bacterial plasmids, and sequenced **20 independent clones** ($n = 10$ normoglycaemic control clones and $n = 10$ hyperglycaemic clones) via Sanger sequencing.

Using **CodonCode Aligner** and custom Python parsing scripts to align the 20 clone traces against the unconverted reference promoter sequence across all CpG dinucleotide sites:

| Cohort Condition | Sequenced Clones ($n$) | Mean *COL1A1* Promoter CpG Methylation | Standard Error ($\pm\text{SEM}$) | Two-Sample Hypothesis Test |
| :--- | :--- | :--- | :--- | :--- |
| **Normoglycaemic Control ($5.0\text{ mM}$)** | $10$ | **$13.1\%$** | $\pm 3.0\%$ | Baseline active promoter |
| **Hyperglycaemic Senescent ($80.5\text{ mM}$)** | $10$ | **$36.4\%$** | $\pm 6.3\%$ | **$p = 0.002$ (Statistically Significant)** |

The nearly three-fold increase in promoter CpG methylation ($36.4\%$ vs $13.1\%$, $p = 0.002$) provides direct molecular evidence that chronic hyperglycaemia recruits *de novo* DNA methyltransferases (DNMTs) to methylate the *COL1A1* promoter, sterically hindering transcription factor binding and locking diabetic wound fibroblasts into a matrix-deficient senescent state.

---

## 4. Mechanistic Synthesis: The ROS-Senescence-Epigenetic Feedback Loop

Combining our RT-PCR and bisulphite sequencing results points to a self-reinforcing pathological cascade in diabetic ulcers:
1. **Hyperglycaemic Mitochondrial & NOX4 Oxidative Stress:** Excess intracellular glucose flux elevates *NOX4* expression, generating chronic reactive oxygen species ($\text{ROS}$).
2. **DNA Damage Response & SASP Activation:** Persistent oxidative stress triggers telomeric and promoter oxidative lesions, activating p16/p21 cell-cycle arrest and NF-$\kappa$B-mediated secretion of *IL6* and *MMP1*.
3. **Epigenetic *COL1A1* Silencing:** Oxidative stress recruits DNMT1/DNMT3a complexes to CpG islands within the *COL1A1* promoter, hypermethylating the locus ($13.1\% \to 36.4\%$) and halting type I collagen synthesis even while *MMP1* actively degrades existing dermal collagen fibres.
