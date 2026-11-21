import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  linkURL?: string;
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  subtitle?: string;
  badge?: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoTitle?: string;
  pagesInfoArr: PagesInfoInterface[];
  link?: string;
}

export const Experiences: ProjectInterface[] = [
  {
    id: "nanopore-basecalling",
    companyName: "HMM Nanopore Basecaller",
    subtitle: "Numba-Accelerated 1,025-State 5-Mer Basecaller on Raw POD5 Signals",
    badge: "81% Sequence Identity vs Dorado",
    type: "Sequencing & Bioinformatics",
    category: ["Sequencing & Bioinformatics", "Bioinformatics", "Computational Bioengineering"],
    shortDescription:
      "Built a 1,025-state 5-mer Hidden Markov Model (log-space Baum-Welch training and 4x downsampled Viterbi decoding) from scratch in Python with Numba JIT multi-core execution to decode raw nanopore POD5 ionic current reads, achieving 81% sequence identity against Oxford Nanopore Dorado.",
    websiteLink: "/portfolio/blog/nanopore-basecalling",
    githubLink: "https://github.com/aahmeddev/nanopore-basecalling-project",
    techStack: [
      "Python",
      "Numba JIT",
      "Hidden Markov Models",
      "POD5 / FASTQ",
      "Biopython",
      "Pandas / NumPy / SciPy",
      "Git",
    ],
    startDate: new Date("2025-07-29"),
    endDate: new Date("2025-08-15"),
    companyLogoImg: "/portfolio/projects/nanopore-hmm-basecaller/hmm_viterbi_overview.png",
    pagesInfoTitle: "Signal Conditioning, DTW Reference Alignment & 1,025-State HMM Architecture",
    pagesInfoArr: [
      {
        title: "Viterbi MAP State Decoding & 5-Mer Gaussian Emission Posteriors",
        description:
          "Piecewise 5-mer maximum a posteriori (MAP) state sequence decoded over RobustScaler-normalised 4 kHz ionic current from read 2536858a-ed8f-4e09-8dfe-15d7e2dd57c9 (HG002 human reference), paired with Baum-Welch learned Gaussian emission densities across overlapping k-mer contexts and state 1024 (UNK).",
        imgArr: ["/portfolio/projects/nanopore-hmm-basecaller/hmm_viterbi_overview.png"],
      },
      {
        title: "Two-Pass Multiprocessing DTW Search & 6-Feature Event PCA Projection",
        description:
          "SignalAligner scans human chromosome 22 (NC_000022.11, GRCh38) via a two-pass coarse-to-fine Dynamic Time Warping pipeline using shared worker memory (_init_worker) and the Nanopolish R9.4 5-mer lookup table, locating the true genomic origin near 38,010,200 bp. BaseSignatureAnalyzer extracts 6 statistical moments per segmented event for PCA and Ward hierarchical clustering.",
        imgArr: ["/portfolio/projects/nanopore-hmm-basecaller/dtw_pca_analysis.png"],
      },
      {
        title: "Multi-Stage POD5 Signal Preprocessing & Derivative Event Segmentation",
        description:
          "SignalPreprocessor clips 3x IQR spike artefacts, applies a 5-point median filter, subtracts a 3rd-degree polynomial baseline drift fit, normalises via RobustScaler (median and interquartile range), and detects k-mer translocation plateaus using MAD-thresholded first-difference peaks.",
        imgArr: ["/portfolio/blogs/nanopore-basecalling/signal_preprocessing.jpg"],
      },
      {
        title: "Apache Arrow POD5 Container Architecture & Read Extraction",
        description:
          "Pod5DataLoader wraps the official pod5.Reader context manager to stream raw 16-bit ADC counts and calibration metadata from HG002_raw_read.pod5 without loading entire multi-gigabyte sequencing archives into system RAM.",
        imgArr: ["/portfolio/blogs/nanopore-basecalling/pod5_file_structure.png"],
      },
      {
        title: "Read the Full Mathematical & Algorithmic Walkthrough",
        description:
          "Detailed breakdown of the 1,025-state sparse transition topology, _logsumexp_jit numerical stability, 50,000-sample batched Baum-Welch expectation-maximisation, and failure-mode comparisons against CTC and neural CRF basecallers.",
        imgArr: [],
        linkURL: "/portfolio/blog/nanopore-basecalling",
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Oxford Nanopore sequencers measure continuous ionic current disruptions (in picoamperes, sampled at 4 kHz) as single-stranded DNA ratchets through a biological nanopore at roughly 400 to 450 bases per second. Because approximately k = 5 nucleotides occupy the sensing constriction simultaneously, each plateau in the current trace corresponds to one of 4^5 = 1,024 possible 5-mer states rather than an isolated nucleotide. Decoding this signal requires separating overlapping k-mer emission distributions under variable motor-protein dwell times, low-frequency baseline drift, and high-frequency capacitive noise.",
        "I engineered a modular, eight-module Python basecalling pipeline (Pod5DataLoader, SignalPreprocessor, BaseSignatureAnalyzer, SignalAligner, HMMBasecaller, SignalVisualizer, main_test, and evaluate_accuracy) from first principles without external HMM libraries. In SignalPreprocessor, raw 4 kHz POD5 reads undergo 3x interquartile-range (IQR) outlier clipping, 5-point median filtering (scipy.signal.medfilt), 3rd-degree polynomial baseline drift subtraction (np.polyfit), and scikit-learn RobustScaler normalisation, followed by median-absolute-deviation (MAD) derivative change-point detection to segment steady current plateaus.",
        "To construct supervised ground-truth labels for emission initialisation, SignalAligner converts the GRCh38 human chromosome 22 reference (NC_000022.11) into an expected ionic current trace using the 6-column Nanopolish R9.4 pore model (nanopolish_5mer_model.txt) andRobustScaler alignment. Rather than running a prohibitively expensive full-chromosome Dynamic Time Warping (DTW) matrix, SignalAligner dynamically downsamples the raw trace by sampling_rate / 450 bp/s and executes a two-pass multiprocessing search (imap_unordered with _init_worker shared worker state): a coarse pass across the genomic region around offset 38,010,000 bp followed by a fine-grained local refinement pass using fastdtw (radius = 1) to map each sample to its underlying 5-mer.",
        "In HMMBasecaller, I formulated a 1,025-state Hidden Markov Model comprising all 1,024 canonical 5-mers plus a dedicated catch-all unknown state (unknown_state_idx = 1024, N(0, 1)) that absorbs unaligned segments and ionic spikes. Each 5-mer state maintains a self-transition probability p_stay = 0.50 to model variable dwell duration, an escape probability p_to_unknown = 0.05 to the catch-all state, and uniform step-forward probabilities (1 - 0.55) / 4 = 0.1125 distributed across the 4 biologically valid successor 5-mers sharing a 4-base overlap (for example, CGATC transitioning to GATCA, GATCC, GATCG, or GATCT). Pre-filtering valid predecessor and successor index lists into typed NumbaList adjacency structures reduces per-step transition complexity from dense O(N^2) = 1,050,625 operations to sparse O(5N) = 5,125 operations.",
        "Because multiplying tens of thousands of emission probabilities causes immediate IEEE-754 floating-point underflow, the forward pass (_forward_pass_log_jit), backward pass (_backward_pass_log_jit), Baum-Welch expectation-maximisation updates (_baum_welch_step_log_jit), and Viterbi decoding (_viterbi_decode_jit) execute entirely in log-space using a custom Numba-compiled log-sum-exp kernel (_logsumexp_jit) and parallel prange loops. During sequence reconstruction, self-transition stretches are collapsed and consecutive overlapping 5-mers are stitched by appending the terminal nucleotide of each newly entered state.",
      ],
      bullets: [
        "Implemented context-managed POD5 ingestion (pod5_data_loader.py) and five-stage signal conditioning (signal_preprocessor.py) combining 3x IQR clipping, 5-point median filtering, 3rd-order polynomial baseline removal, and RobustScaler z-IQR standardisation.",
        "Built BaseSignatureAnalyzer (base_signature_analyzer.py) to extract 6 statistical features per segmented current plateau (mean, standard deviation, dwell duration, median, skewness, and kurtosis) and evaluate k-mer separability via Principal Component Analysis, Ward hierarchical linkage dendrograms, and K-Means clustering.",
        "Parallelised two-pass coarse-to-fine Dynamic Time Warping (signal_aligner.py) across CPU cores via Python multiprocessing (imap_unordered with zero-copy worker initialisation) against human chromosome 22 (NC_000022.11) and the Nanopolish R9.4 5-mer model.",
        "Trained the 1,025-state HMM via 50,000-sample batched log-space Baum-Welch expectation-maximisation (hmm_basecaller.py) with an enforced emission standard-deviation floor (sigma >= 0.20) and log_gamma clipping to prevent degenerate Gaussian collapse.",
        "Bounded Viterbi traceback memory consumption on long sequencing reads using a 4x signal downsampling factor (viterbi_downsample_factor = 4) and benchmarked the reconstructed FASTA read against Oxford Nanopore's production Dorado basecaller using Biopython (Bio.Align.PairwiseAligner in evaluate_accuracy.py), achieving 81% global sequence identity.",
      ],
    },
  },
  {
    id: "dna-quality-control-toolkit",
    companyName: "DNA QC Toolkit (QCToolkit)",
    subtitle: "Multi-Threaded Java 22, JavaFX 24 & Python FASTQ Quality Control Suite",
    badge: "Multi-Threaded FASTQ Engine",
    type: "Sequencing & Bioinformatics",
    category: ["Sequencing & Bioinformatics", "Bioinformatics", "Computational Bioengineering"],
    shortDescription:
      "Engineered a multi-threaded desktop application in Java 22, JavaFX 24, and Python to stream .fastq and .fastq.gz sequencing archives, grade 9 FastQC diagnostic modules, execute sliding-window read trimming, and export standalone interactive Plotly.js HTML reports.",
    websiteLink: "/portfolio/projects/dna-quality-control-toolkit/SRR490124_2_quality_report.html",
    githubLink: "https://github.com/aahmeddev/QC-Toolkit",
    techStack: [
      "Java",
      "JavaFX",
      "Python",
      "POD5 / FASTQ",
      "Biopython",
      "Pandas / NumPy / SciPy",
      "HTML 5",
      "Git",
    ],
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-07-27"),
    companyLogoImg: "/portfolio/projects/dna-quality-control-toolkit/data_examples.png",
    pagesInfoTitle: "JavaFX Desktop Interface, Diagnostic Plots & Interactive Plotly HTML Output",
    pagesInfoArr: [
      {
        title: "10 Scientific Diagnostic Charts via Java-to-Python Subprocess Piping",
        description:
          "PlotGenerator streams aggregated FASTQ statistics over stdin as CSV buffers to 7 headless Matplotlib (Agg backend) scripts, caching rendered ImageView nodes inside a thread-safe plotNodeCache for instant tab switching.",
        imgArr: ["/portfolio/projects/dna-quality-control-toolkit/data_examples.png"],
      },
      {
        title: "Automated 9-Module FastQC Grading & Base Composition Summary",
        description:
          "ModuleEvaluator grades 9 diagnostic categories into PASS, WARN, or FAIL statuses with traffic-light sidebar badges, validated here on E. coli K-12 MG1655 Illumina paired-end sequencing run SRR490124.",
        imgArr: ["/portfolio/projects/dna-quality-control-toolkit/base_statistics.png"],
      },
      {
        title: "Multi-Tab Drag-and-Drop FASTQ Workspace & Persistent Recent Files",
        description:
          "MainTabController coordinates dual ExecutorService thread pools (analysisExecutor and plotExecutor), drag-and-drop file ingestion (.fastq, .fq, .fastq.gz, .fq.gz), and persistent recent-file history via java.util.prefs.Preferences.",
        imgArr: ["/portfolio/projects/dna-quality-control-toolkit/welcome_page.png"],
      },
      {
        title: "Interactive Adapter & Sliding-Window Phred Read Trimming",
        description:
          "TrimmingTask executes asynchronous 5' and 3' quality trimming, poly-G/adapter stripping, and minimum-length filtering with live progress bindings before re-queuing the cleaned FASTQ stream for immediate before-and-after QC comparison.",
        imgArr: ["/portfolio/projects/dna-quality-control-toolkit/trimming.png"],
      },
      {
        title: "Open Live Interactive Plotly.js HTML QC Report (SRR490124_2)",
        description:
          "Inspect a real standalone HTML quality control report generated by HtmlReportGenerator.java with embedded Plotly.js (v2.30.0) interactive charts and Jackson-serialised JSON summaries.",
        imgArr: [],
        linkURL: "/portfolio/projects/dna-quality-control-toolkit/SRR490124_2_quality_report.html",
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "High-throughput short- and long-read sequencing runs frequently suffer from 3' Phred quality decay, adapter read-through, PCR duplication spikes, and GC-bias artefacts that corrupt downstream variant calling or de novo assembly if left unfiltered. Inspired by Babraham Bioinformatics' FastQC, I architected QCToolkit as a cross-language desktop application combining a Java 22 and JavaFX 24 GUI front-end (Maven build with Jackson 2.17.0 and Maven Assembly fat-JAR packaging) with a headless Python scientific plotting engine.",
        "In FastqAnalysisTask.java, the core parser streams 4-line FASTQ records directly from uncompressed files or on-the-fly GZIPInputStream (.fastq.gz / .fq.gz) archives without buffering full gigabyte files in memory. To keep the desktop interface responsive during multi-million-read parsing, MainTabController maintains two dedicated background thread pools: a cached analysisExecutor for concurrent file ingestion and a bounded fixed plotExecutor (sized to available CPU cores minus one) for parallel figure rendering. Byte-level read progress is exposed via a custom ReadOnlyLongWrapper property bound directly to JavaFX progress bars, supporting both rapid 100,000-read preview scans and full-archive analysis.",
        "Once streaming completes, AnalysisSummary aggregates per-position Phred+33 quality quartiles (mean, median, lower/upper quartiles, 10th/90th percentiles), per-read average Phred distributions, A/T/G/C/N positional base ratios, theoretical vs empirical normal GC distributions, sequence length histograms, duplication levels, overrepresented sequences, and positional k-mer enrichment. ModuleEvaluator.java then evaluates 9 formal FastQC diagnostic rules: for example, Per Base Sequence Quality triggers WARN if any nucleotide position exhibits a median Phred score below 20 (or lower quartile below 10) and FAIL if any median drops below 10 (or lower quartile below 5); Per Sequence GC Content grades deviations exceeding 15% (WARN) or 30% (FAIL) from the theoretical normal curve; and Overrepresented Sequences flags single sequences exceeding 0.1% (WARN) or 1.0% (FAIL) of the library.",
        "To combine Java's multi-threaded UI performance with Python's publication plotting ecosystem, PlotGenerator.java spawns asynchronous ProcessBuilder workers that pipe summary CSV streams directly into stdin of 7 headless Agg Matplotlib scripts (create_box_plot.py, create_bar_chart.py, create_gc_distribution_plot.py, create_kmer_plot.py, create_multi_line_plot.py, create_simple_line_plot.py, and create_table.py) and caches the returned PNG byte streams in a thread-safe plotNodeCache. For collaborative sharing without requiring Java or Python on the recipient's machine, HtmlReportGenerator.java serialises the analysis structures via Jackson ObjectMapper into a standalone HTML5 report powered by Plotly.js (plotly-2.30.0.min.js).",
      ],
      bullets: [
        "Architected a dual-pool concurrent execution model (MainTabController.java, AnalysisTabController.java) separating GZIPInputStream FASTQ streaming (FastqAnalysisTask.java) from parallel subprocess chart rendering.",
        "Implemented automated PASS/WARN/FAIL rule evaluation across 9 FastQC modules in ModuleEvaluator.java (Per Base Sequence Quality, Per Sequence Quality Scores, Per Base Sequence Content, Per Sequence GC Content, Per Base N Content, Sequence Length Distribution, Sequence Duplication Levels, Overrepresented Sequences, and Adapter Content).",
        "Built an asynchronous read-cleaning engine (TrimmingTask.java) supporting sliding-window Phred threshold trimming, adapter clipping, and minimum read-length filtering with one-click re-analysis of the trimmed output.",
        "Bridged Java 22 and Python via zero-disk-temp stdin/stdout process piping in PlotGenerator.java across 7 modular Matplotlib/SciPy scripts, paired with standalone interactive Plotly.js HTML report export in HtmlReportGenerator.java.",
      ],
    },
  },
  {
    id: "gene-expression-explorer",
    companyName: "Gene Expression Explorer",
    subtitle: "Universal Differential Transcriptomics, Welch t-Test & Clustered Heatmap App",
    badge: "Live Streamlit App",
    type: "Sequencing & Bioinformatics",
    category: ["Sequencing & Bioinformatics", "Bioinformatics", "Computational Bioengineering"],
    shortDescription:
      "Built and deployed an interactive Python and Streamlit differential gene expression platform featuring heuristic cohort auto-detection, vectorised SciPy Welch t-tests, Z-score row-normalised Seaborn Ward clustermaps, and interactive Plotly volcano and per-gene boxplots.",
    websiteLink: "https://gene-expression-explorer.streamlit.app/",
    githubLink: "https://github.com/aahmeddev/gene-expression-explorer",
    techStack: ["Python", "Streamlit", "Pandas / NumPy / SciPy", "Git"],
    startDate: new Date("2025-08-22"),
    endDate: new Date("2025-09-27"),
    companyLogoImg: "/portfolio/projects/gene-expression-explorer/volcano_heatmap_overview.png",
    pagesInfoTitle: "Differential Expression Pipeline & Live Cloud Application",
    pagesInfoArr: [
      {
        title: "Volcano Plot & Row Z-Score Differential Expression Matrix",
        description:
          "Simultaneous fold-change vs statistical significance filtering (-log10 p-value from vectorised two-sample Welch t-tests against log2 fold change) paired with row-wise Z-score standardisation across case and control cohorts.",
        imgArr: ["/portfolio/projects/gene-expression-explorer/volcano_heatmap_overview.png"],
      },
      {
        title: "Seaborn Hierarchical Ward Clustermap with Cohort Annotation Bars",
        description:
          "create_heatmap_figure computes row-normalised Z-scores (z_score = 0) and renders a high-resolution 300 DPI RdBu_r hierarchical clustered heatmap with colour-coded sample cohort tracks and automatic dynamic figure height scaling.",
        imgArr: ["/portfolio/projects/gene-expression-explorer/clustered_heatmap.png"],
      },
      {
        title: "Launch Gene Expression Explorer Live on Streamlit Cloud",
        description:
          "Upload raw or normalised CSV, TSV, TXT, Excel (.xlsx/.xls), or gzip-compressed (.csv.gz/.txt.gz) expression matrices, auto-detect sample cohorts, tune p-value and log2FC cutoffs, and export publication PNGs and DEG tables.",
        linkURL: "https://gene-expression-explorer.streamlit.app",
        imgArr: [],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Bulk RNA-seq and microarray studies produce high-dimensional expression matrices containing tens of thousands of transcripts across heterogeneous clinical or experimental cohorts. Extracting biologically meaningful signatures requires cleaning malformed tabular exports, assigning sample columns to experimental conditions, filtering out low-abundance noise, and pairing fold-change magnitude thresholds with hypothesis testing.",
        "I designed and deployed Gene Expression Explorer (geo_app.py) as an end-to-end Python and Streamlit web application that accepts arbitrary user-uploaded transcriptomic matrices without requiring rigid column naming conventions. Its universal file loader (load_data) automatically inspects file headers and extensions across uncompressed (.csv, .tsv, .txt), Excel (.xlsx, .xls), and gzip-compressed (.csv.gz, .txt.gz) archives, separates gene identifier columns from numeric sample columns, coerces non-numeric artefacts, and averages duplicate gene symbols.",
        "To eliminate tedious manual column assignment on large cohorts, I wrote a heuristic sample-group detector (detect_sample_groups) that scans column headers for clinical keyword tokens (TUMOR, NORMAL, CONTROL, TREATED, CASE, CTRL, WT, KO, PATIENT, HEALTHY) as well as shared 2-to-5-character prefixes and suffixes, scoring candidate splits by cohort balance to pre-populate Group 1 (Control) and Group 2 (Experimental) selections. Researchers can also override cohorts via interactive multiselect widgets or upload an external sample-metadata mapping CSV.",
        "In the cached statistical engine (process_expression_data, decorated with @st.cache_data), genes below a configurable mean expression threshold are filtered out, raw counts or intensities optionally undergo log2(x + 1) transformation, and vectorised two-sample Student/Welch t-tests (scipy.stats.ttest_ind with nan_policy = 'omit') compute per-gene p-values, -log10(p) significance scores, and log2 fold changes (mean_group2 - mean_group1). The frontend then renders three linked views: a 300 DPI Z-score row-normalised hierarchical clustered heatmap (seaborn.clustermap with RdBu_r diverging colormap and sample cohort colour bars), an interactive hover-enabled Plotly Express volcano plot with live p-value and |log2FC| threshold lines, and per-gene jittered boxplots (px.box with points = 'all') showing individual biological replicate distributions.",
      ],
      bullets: [
        "Engineered a multi-format transcriptomic matrix parser (load_data in geo_app.py) supporting .csv, .tsv, .txt, .xlsx, .xls, and gzipped .gz matrices with automatic delimiter inference and duplicate-gene aggregation.",
        "Built a two-stage heuristic cohort classifier (detect_sample_groups) combining clinical keyword recognition with balanced prefix/suffix clustering, alongside external metadata CSV mapping.",
        "Implemented @st.cache_data vectorised differential expression analysis computing log2(x + 1) transforms, log2 fold changes, and per-gene two-sample t-tests (scipy.stats.ttest_ind) across thousands of transcripts in milliseconds.",
        "Combined publication-grade 300 DPI Seaborn/Matplotlib hierarchical Ward clustermaps (with automated PNG download streams) and interactive Plotly Express volcano plots and replicate-level gene boxplots.",
      ],
    },
  },
  {
    id: "myowave-ehg-platform",
    companyName: "MYOWAVE EHG Diagnostic Platform",
    subtitle: "Non-Invasive Electrohysterography Hardware, 250 Hz DSP & Clinical Portals",
    badge: "Best Design Group Project Prize",
    type: "Hardware & Medtech",
    category: ["Hardware & Medtech", "Diagnostics & Assays", "Embedded Systems", "Full-Stack Bioengineering"],
    shortDescription:
      "Won the Year 2 Molecular Bioengineering Prize for Best Design Group Project. Owned all electronic hardware (KiCad ADS1299 PCB, Arduino Due DAC generator) and software (250 Hz SciPy Butterworth/Welch DSP engine, NiceGUI + Firebase clinical and patient portals) for the ENDO1000 endometriosis study.",
    websiteLink: "/portfolio/blog/myowave-ehg-diagnostics",
    githubLink: "https://github.com/aahmeddev/DAPP2_MOL_Group_F-MYOWAVE",
    techStack: [
      "Python",
      "NiceGUI",
      "Streamlit",
      "KiCad PCB",
      "ADS1299 / SPI",
      "Arduino / STM32",
      "SolidWorks 3D CAD",
      "Firebase",
      "Pandas / NumPy / SciPy",
      "Git",
    ],
    startDate: new Date("2025-10-01"),
    endDate: new Date("2026-05-30"),
    companyLogoImg: "/portfolio/projects/myowave-ehg/pcb_angled_3d.png",
    pagesInfoTitle: "Custom KiCad Biopotential PCB Renders & 250 Hz EHG Signal Conditioning",
    pagesInfoArr: [
      {
        title: "3D KiCad Render of the Custom ADS1299 8-Channel Biopotential Acquisition Shield",
        description:
          "Angled 3D KiCad board render of our custom biopotential acquisition PCB routing differential Ag/AgCl electrode inputs, passive RC anti-aliasing networks, and bipolar/unipolar power regulation (+2.5V, +3.3V, +5V) into the 24-bit Texas Instruments ADS1299-6PAGR front-end.",
        imgArr: ["/portfolio/projects/myowave-ehg/pcb_angled_3d.png", "/portfolio/projects/myowave-ehg/pcb_top_3d.png"],
      },
      {
        title: "250 Hz Butterworth Bandpass Conditioning & Welch FWL/FWH Spectral Density",
        description:
          "Time-domain uterine contraction burst filtering (0.34 to 1.0 Hz 4th-order Butterworth bandpass removing 50 Hz mains interference and respiration drift) paired with Welch Power Spectral Density decomposition across Fast Wave Low (FWL) and Fast Wave High (FWH) diagnostic bands.",
        imgArr: ["/portfolio/projects/myowave-ehg/ehg_dsp_pipeline.png"],
      },
      {
        title: "KiCad Copper Routing & Component Placement Layout",
        description:
          "Top and isometric PCB routing views separating sensitive microvolt analogue differential traces from high-speed SPI digital clock lines and power rails.",
        imgArr: ["/portfolio/projects/myowave-ehg/pcb_top_layout.png", "/portfolio/projects/myowave-ehg/pcb_angled_layout.png"],
      },
      {
        title: "Read the Full MYOWAVE Engineering Case Study",
        description:
          "Explore the full hardware schematic design, Arduino Due 12-bit DAC physiological waveform synthesis, CMRR verification suite, and dual NiceGUI + Firebase clinical and patient portals.",
        imgArr: [],
        linkURL: "/portfolio/blog/myowave-ehg-diagnostics",
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Endometriosis takes an average of 7 to 9 years to diagnose because definitive clinical confirmation still relies on invasive diagnostic laparoscopy. MYOWAVE is a non-invasive wearable Electrohysterography (EHG) diagnostic platform engineered for the ENDO1000 longitudinal clinical study to capture, filter, and classify uterine myoelectrical activity from the abdominal surface.",
        "As Project Manager and Lead Electronics and Software Engineer, I led our multidisciplinary team to win Imperial College London's Year 2 Molecular Bioengineering Prize for Best Design Group Project. I personally owned all electronic hardware design, embedded physiological signal synthesis, real-time digital signal processing, and full-stack clinical/patient web application development, while also contributing to user-centric ergonomic enclosure design.",
      ],
      bullets: [
        "Drafted multi-board PCB schematics and layouts in KiCad (MYOWAVE.kicad_sch) integrating a Texas Instruments ADS1299-6PAGR 24-bit delta-sigma biopotential ADC with Arduino Uno/Due shield interfaces, and wrote automated Python hardware verification scripts for passband attenuation and 50 Hz common-mode rejection (T3_CMRR.py at 24x differential programmable gain).",
        "Programmed Arduino Due 12-bit DAC firmware (EHG_Generator.ino, 115,200 baud) synthesising physiological 0.05 Hz slow-wave uterine contractions modulated by fast action-potential bursts and controlled noise floors for benchtop front-end validation.",
        "Engineered a threaded 250 Hz Python acquisition and DSP pipeline (background_service.py, dsp_math.py) applying zero-phase Butterworth bandpass filtering (scipy.signal), RMS envelope burst detection, and Welch power spectral density extraction across Fast Wave Low (0.13 to 0.34 Hz) and Fast Wave High (0.34 to 1.0 Hz) uterine frequency bands.",
        "Built dual authenticated web applications in Python (NiceGUI following an initial Streamlit prototype): a clinical researcher dashboard (port 8081) and a mobile participant symptom-diary app (port 8082) backed by interactive Plotly charts, dual Firebase Firestore cloud synchronisation, and local SQLite persistence.",
      ],
    },
  },
  {
    id: "phreeqc-speciation",
    companyName: "Parallel PHREEQC Speciation Engine",
    subtitle: "Multi-Core Python & C++ IPhreeqc Geochemical Modelling Package",
    badge: "£40k Grant & 35,232 Sensor Records",
    type: "Wet Lab & Systems",
    category: ["Wet Lab & Systems", "Computational Bioengineering", "Diagnostics & Assays"],
    shortDescription:
      "Co-developed an installable multi-core Python package wrapping the USGS IPhreeqc C++ shared library across 13 thermodynamic databases, running parallel chemical speciation across 35,232 environmental sensor records and supporting a £40,000 commercial grant at Nanolyse Technologies.",
    githubLink: "https://github.com/robot1273/phreeqc-python-tool",
    techStack: ["Python", "PHREEQC", "MATLAB", "Pandas / NumPy / SciPy", "Git"],
    startDate: new Date("2025-06-01"),
    endDate: new Date("2026-01-31"),
    companyLogoImg: "/portfolio/projects/phreeqc-speciation/phreeqc_parallel_benchmark.png",
    pagesInfoTitle: "Thermodynamic Speciation Curves & Multi-Core C++ IPhreeqc Scaling",
    pagesInfoArr: [
      {
        title: "Aqueous Ammonia/Carbonate Equilibrium Speciation & Multi-Core Worker Scaling",
        description:
          "Non-linear thermodynamic distribution of un-ionised NH3(aq) vs NH4+ across solution pH paired with multi-process throughput scaling using persistent per-worker libiphreeqc.dll/.so C++ instances.",
        imgArr: ["/portfolio/projects/phreeqc-speciation/phreeqc_parallel_benchmark.png"],
      },
      {
        title: "Catchment Telemetry Un-Ionised Ammonia (NH3) Speciation Output",
        description:
          "Empirical NH3(aq) molar concentration trajectory generated directly by phreeqc-python-tool across multi-parameter river catchment sensor telemetry (pH, temperature, ammonium, nitrite, nitrate, and dissolved oxygen).",
        imgArr: ["/portfolio/projects/phreeqc-speciation/NH3_speciation_plot.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Predicting the bioavailability, precipitation, and ecological toxicity of chemical and pharmaceutical species across wastewater treatment plants, river catchments, and agricultural soils requires solving coupled non-linear thermodynamic equilibrium equations across tens of thousands of continuous sensor measurements.",
        "During my 8-month R&D internship at Nanolyse Technologies Ltd. (Harwell Science and Innovation Campus), I collaborated over Git to engineer phreeqc-python-tool (phreeqc_project v0.1.0), coupling the United States Geological Survey IPhreeqc C++ shared library with multi-core Python batch execution, MATLAB post-processing scripts, and Microsoft Excel commercial feasibility models.",
      ],
      bullets: [
        "Engineered PhreeqcBatchRunner (src/phreeqc/core/batch.py) using concurrent.futures.ProcessPoolExecutor with a persistent worker initialiser (_init_worker) that loads the native libiphreeqc.dll/.so library and one of 13 bundled thermodynamic databases (phreeqc.dat, minteq.v4.dat, wateq4f.dat, llnl.dat, pitzer.dat, iso.dat, sit.dat, Amm.dat, Tipping_Hurley.dat) once per CPU core.",
        "Built automated water-quality ingestion and cleaning (clean_water_quality_file) handling .xls/.xlsx/.csv telemetry, stripping faulty sensor flags, repairing Excel serial timestamps, and retaining key electrochemical parameters (pH, temperature, nitrite, nitrate, ammonium, dissolved oxygen, and electrical conductivity).",
        "Executed parallel speciation across 35,232 dual-catchment sensor records to quantify un-ionised toxic ammonia (NH3, mol/kgw) dynamics, supporting executive feasibility pitches that secured a £40,000 STFC/Harwell commercial grant and 3 corporate R&D partnerships.",
      ],
    },
  },
  {
    id: "pulse-oximeter-spectrophotometer",
    companyName: "8-Ch Pulse Oximeter & CCD Spectrometer",
    subtitle: "Embedded C / ADS1299 Biopotential System & SolidWorks/STM32 Optical Baffle CAD",
    badge: "Embedded Bioinstrumentation",
    type: "Hardware & Medtech",
    category: ["Hardware & Medtech", "Embedded Systems", "Computational Bioengineering"],
    shortDescription:
      "Designed and built an 8-channel ADS1299/Arduino biopotential pulse oximeter over SPI using Embedded C and Python, alongside a custom SolidWorks stray-light-baffled STM32 + Toshiba TCD1304 linear CCD spectrophotometer calibrated via 405/532/650 nm laser regression.",
    websiteLink: "/portfolio/blog/custom-ccd-spectrophotometer",
    techStack: [
      "Embedded C",
      "Python",
      "ADS1299 / SPI",
      "Arduino / STM32",
      "SolidWorks 3D CAD",
      "Pandas / NumPy / SciPy",
      "Git",
    ],
    startDate: new Date("2025-10-01"),
    endDate: new Date("2026-03-30"),
    companyLogoImg: "/portfolio/projects/pulse-oximeter-spectrophotometer/cad_improvements_breakdown.png",
    pagesInfoTitle: "SolidWorks 3D Optical Enclosure CAD & Python Laser/Spectral Calibration",
    pagesInfoArr: [
      {
        title: "SolidWorks Optical Enclosure & Stray-Light Suppression Architecture",
        description:
          "Custom 3D-printed spectrophotometer housing engineered in SolidWorks featuring an asymmetrical sawtooth ceiling baffle, a concave 45-degree specular zero-order V-trap, a 900 lines/mm diffraction grating mount (derived 46.064-degree incidence angle at 532 nm), and a Toshiba TCD1304 linear CCD detector board.",
        imgArr: [
          "/portfolio/projects/pulse-oximeter-spectrophotometer/cad_improvements_breakdown.png",
          "/portfolio/projects/pulse-oximeter-spectrophotometer/cad_isometric.png",
        ],
      },
      {
        title: "Internal Ray-Baffle Geometry: Lid Grating Mount, Sawtooth Ceiling & V-Trap",
        description:
          "Detailed SolidWorks cross-sections of the upper lid grating geometry, internal mirror routing, and concave V-trap designed to extinguish zero-order and wall-scattered stray photons before they reach the 3,648-pixel TCD1304 CCD array.",
        imgArr: [
          "/portfolio/projects/pulse-oximeter-spectrophotometer/cad_lid_grating.png",
          "/portfolio/projects/pulse-oximeter-spectrophotometer/cad_v_trap.png",
        ],
      },
      {
        title: "Three-Laser Wavelength Calibration (405 / 532 / 650 nm) & Chemical Identification",
        description:
          "Linear regression pixel-to-wavelength calibration across violet (405 nm), green (532 nm), and red (650 nm) diode laser peaks, followed by normalised transmission absorbance and 90-degree fluorescence spectra against commercial reference spectrophotometers.",
        imgArr: [
          "/portfolio/projects/pulse-oximeter-spectrophotometer/laser_calibration.png",
          "/portfolio/projects/pulse-oximeter-spectrophotometer/chemical_id_proof.png",
        ],
      },
      {
        title: "Normalized Absorbance, Fluorescence & Colorimetry Benchmarks",
        description:
          "Multi-replicate (n = 5) absorbance and fluorescence profiles across organic dyes and chlorophyll extracts confirming peak recovery and stray-light suppression.",
        imgArr: [
          "/portfolio/projects/pulse-oximeter-spectrophotometer/absorbance_combined.png",
          "/portfolio/projects/pulse-oximeter-spectrophotometer/fluorescence_combined.png",
        ],
      },
      {
        title: "Read the Full Spectrophotometer Optical & Embedded Engineering Article",
        description:
          "Complete optical grating derivation, SolidWorks mechanical tolerances, STM32 Nucleo-F401RE firmware timing, and Python spectral deconvolution analysis.",
        imgArr: [],
        linkURL: "/portfolio/blog/custom-ccd-spectrophotometer",
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Reliable point-of-care diagnostics depend on low-noise analogue front-ends, deterministic embedded firmware, and mechanically isolated optical paths. Across two Imperial College London bioinstrumentation builds, I engineered both an 8-channel biopotential pulse oximetry acquisition system and a custom transmission and fluorescence CCD spectrophotometer.",
      ],
      bullets: [
        "Full-Stack 8-Channel Pulse Oximeter (Hardware & Software Lead): Interfaced an 8-channel Texas Instruments ADS1299 biopotential ADC with an Arduino microcontroller over high-speed SPI using Embedded C firmware and a real-time Python physiological modelling and visualisation UI (building on an earlier Year 1 I2C Maxim MAX30101 and MAX32664 prototype).",
        "Custom CCD Spectrophotometer (79% Report Mark): Modelled a complete optical enclosure in SolidWorks (Ahmed_Casing.SLDASM, CCD_Board.SLDASM, TransmissionCuvetteHolder.SLDPRT) housing ThorLabs and Newport optical mounts, a 900 lines/mm diffraction grating (derived 46.064-degree incidence angle at 532 nm), and an STM32 Nucleo-F401RE driving a 3,648-pixel Toshiba TCD1304 linear CCD.",
        "Stray-Light Suppression & Spectral Calibration: Engineered an asymmetrical ceiling sawtooth baffle and a concave 45-degree zero-order V-trap to eliminate internal reflections, and wrote Python linear-regression calibration scripts (scipy.stats.linregress) mapping CCD pixel indices against 405 nm, 532 nm, and 650 nm laser peaks to quantify unknown dye absorbance and chlorophyll fluorescence.",
      ],
    },
  },
  {
    id: "cpp-physics-simulations",
    companyName: "C++17 Multi-Threaded Boids & Soft-Body Engine",
    subtitle: "Structure-of-Arrays Spatial Hashing, std::thread Concurrency & 120 FPS Solver",
    badge: "High-Performance C++17",
    type: "Wet Lab & Systems",
    category: ["Wet Lab & Systems", "High-Performance C++", "Computational Bioengineering"],
    shortDescription:
      "Architected two real-time C++17 simulation engines in CLion with CMake and SFML 3.0.0: a multi-threaded predator-prey flocking simulator using cache-friendly Structure-of-Arrays layout and spatial hashing, and a 120 FPS fixed-timestep mass-spring soft-body physics solver.",
    techStack: ["C++17", "Git"],
    startDate: new Date("2025-06-15"),
    endDate: new Date("2025-09-10"),
    companyLogoImg: "/portfolio/projects/cpp-physics-boids-engine/boids_softbody_sim.png",
    pagesInfoTitle: "O(N) Spatial-Hash Grid Partitioning & 2D Hookean Spring-Mass Lattice",
    pagesInfoArr: [
      {
        title: "O(N) Spatial-Hash Cell Queries & Semi-Implicit Euler Soft-Body Deformation",
        description:
          "Left: 3x3 spatial-hash neighbourhood lookup (cell size = perception radius R) enabling 2,500+ autonomous flocking agents at 60+ FPS in C++17. Right: 2D Hookean structural, shear, and bend spring-mass mesh deforming under boundary impact with 20 constraint solver iterations per 1/1600 s physics tick.",
        imgArr: ["/portfolio/projects/cpp-physics-boids-engine/boids_softbody_sim.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "High-throughput scientific computing and real-time biological simulations require cache-conscious memory layouts, deterministic numerical time-stepping, and multi-core thread synchronisation in modern C++.",
        "I built two standalone C++17 simulation engines in CLion using CMake (FetchContent) and statically linked SFML 3.0.0 to explore data-oriented design and numerical constraint stability under strict real-time frame budgets.",
      ],
      bullets: [
        "Multi-Threaded Boid Flocking Engine (Boid Simulation): Refactored autonomous agent state from Array-of-Structures into a cache-friendly Structure-of-Arrays (BoidData) memory layout, implemented O(1) spatial-hash grid partitioning (SpacialHash.cpp) to eliminate quadratic O(N^2) neighbour scans, and parallelised force evaluation across std::thread workers with std::mutex synchronisation.",
        "2D Soft-Body Physics Engine (SoftBodyMechanics): Implemented Verlet and semi-implicit Euler position integration with 20 iterative Hookean spring-constraint solver passes per physics tick, decoupling a deterministic 1/1600 s fixed physics timestep from a 120 FPS rendering loop with frame-time clamping, gravity, viscous damping, and penalty boundary restitution.",
      ],
    },
  },
  {
    id: "diabetic-wound-epigenetics",
    companyName: "Diabetic Wound Epigenetics & Nanomaterials",
    subtitle: "COL1A1 Bisulphite Sequencing (p = 0.002), RT-PCR, CdSe Quantum Dots & Enzyme Kinetics",
    badge: "84.38% & 84.00% Lab Reports",
    type: "Wet Lab & Systems",
    category: ["Wet Lab & Systems", "Diagnostics & Assays", "Bioinformatics"],
    shortDescription:
      "Investigated hyperglycaemia-induced dermal fibroblast senescence via Qiagen RNeasy RNA extraction, 35-cycle RT-PCR, and CodonCode Aligner bisulphite sequencing (confirming COL1A1 promoter hypermethylation from 13.1% to 36.4%, p = 0.002), alongside CdSe quantum dot passivation and MATLAB enzyme kinetics.",
    websiteLink: "/portfolio/blog/diabetic-wound-epigenetics",
    techStack: [
      "Mammalian Cell Culture",
      "RT-PCR & Bisulphite Seq",
      "Python",
      "MATLAB",
      "Pandas / NumPy / SciPy",
    ],
    startDate: new Date("2025-10-15"),
    endDate: new Date("2026-05-15"),
    companyLogoImg: "/portfolio/projects/diabetic-wound-epigenetics/cpg_methylation_summary.png",
    pagesInfoTitle: "Epigenetic Bisulphite Sequencing, RT-PCR Gels & Nanomaterial Spectroscopy",
    pagesInfoArr: [
      {
        title: "COL1A1 Promoter CpG Hypermethylation (p = 0.002) & Transcriptional Remodelling",
        description:
          "Bisulphite sequencing across 20 bacterial clones (10 normoglycaemic 5 mM controls vs 10 hyperglycaemic 80.5 mM dermal fibroblast clones) demonstrating a nearly three-fold rise in COL1A1 promoter cytosine methylation (from 13.1% to 36.4%, p = 0.002) alongside COL1A1 downregulation and MMP1/NOX4/IL6 upregulation.",
        imgArr: ["/portfolio/projects/diabetic-wound-epigenetics/cpg_methylation_summary.png"],
      },
      {
        title: "2% Agarose Gel Electrophoresis of 35-Cycle Semi-Quantitative RT-PCR Amplicons",
        description:
          "Experimental UV transilluminator gel image (Group 7) comparing GAPDH housekeeping controls against COL1A1, MMP1, NOX4, and IL6 amplicons extracted via Qiagen RNeasy Plus spin columns and reverse-transcribed with SuperScript IV.",
        imgArr: ["/portfolio/projects/diabetic-wound-epigenetics/rtpcr_gel_results.jpg"],
      },
      {
        title: "Gold Nanorod Gans Plasmon Modes & CdSe Quantum Dot Oleylamine Passivation",
        description:
          "High-resolution UV-Vis absorbance and fluorescence emission curves showing CTAB gold nanorod transverse/longitudinal surface plasmon resonance splitting and CdSe quantum dot deep-trap passivation (where oleylamine ligand treatment halved emission FWHM from 185.2 nm to 91.9 nm), paired with LaMer and Zeldovich nucleation models.",
        imgArr: [
          "/portfolio/projects/diabetic-wound-epigenetics/nanorod_qd_absorbance.png",
          "/portfolio/projects/diabetic-wound-epigenetics/nucleation_model_comparison.png",
        ],
      },
      {
        title: "Read the Full Epigenetics & Nanomaterials Research Articles",
        description:
          "Explore the complete experimental protocols, bisulphite clone alignments, Gans electrodynamic derivations, and enzyme inhibition kinetics in the technical articles library.",
        imgArr: [],
        linkURL: "/portfolio/blog/diabetic-wound-epigenetics",
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Across Imperial College London's wet-lab molecular bioengineering modules, I combined mammalian cell culture, nucleic acid extraction, and colloidal nanomaterial synthesis with programmatic data analysis in Python and MATLAB.",
      ],
      bullets: [
        "Diabetic Wound Failure & Cellular Senescence (84.38% Report Mark): Cultured primary human dermal fibroblasts for 14 days under hyperglycaemic (80.5 mM) vs normoglycaemic (5 mM) media; performed Qiagen RNeasy Plus RNA extraction, SuperScript IV cDNA synthesis, 35-cycle semi-quantitative RT-PCR (COL1A1, MMP1, NOX4, IL6, GAPDH), and 2% agarose gel electrophoresis.",
        "Epigenetic Bisulphite Sequencing (p = 0.002): Analysed 20 bisulphite-sequenced clones (10 control, 10 high-glucose) across CpG dinucleotides in the COL1A1 promoter using CodonCode Aligner and custom Python quantification scripts, demonstrating a statistically significant methylation increase from 13.1% +/- 3.0% to 36.4% +/- 6.3% (p = 0.002).",
        "Nanomaterials & Analytical Spectroscopy (84.00% Report Mark): Synthesised CTAB-stabilised gold nanorods (modelling transverse and longitudinal plasmon modes via Gans theory) and CdSe quantum dots (where oleylamine ligand passivation halved fluorescence FWHM from 185.2 nm to 91.9 nm); elucidated aspirin structure via FTIR, 600.25 MHz 1H NMR, TLC, and melting-point assays.",
        "Enzyme Kinetics & Control Systems (MATLAB & Simulink): Quantified acid phosphatase competitive inhibition by inorganic phosphate (Ki = 463 uM, Ea = 59.84 kJ/mol, pH 5.322 optimum) and modelled RLC s-plane stability, PID fan control, and EMG/EEG/ECG digital filters in MATLAB and Simulink.",
      ],
    },
  },
];

export const featuredExperiences = Experiences.slice(0, 6);
