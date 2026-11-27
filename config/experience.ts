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

export interface ProjectMetricInterface {
  label: string;
  value: string;
  detail?: string;
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
  blogLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  keyMetrics?: ProjectMetricInterface[];
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoTitle?: string;
  pagesInfoArr: PagesInfoInterface[];
  link?: string;
}

export const Experiences: ProjectInterface[] = [
  {
    id: "clinical-trial-feasibility-dashboard",
    companyName: "Clinical Trial Feasibility Analytics & SQL Dashboard",
    subtitle: "Live ClinicalTrials.gov v2 API -> SQLite Relational Warehouse -> UK & EU4 Site Density Dashboard",
    badge: "200 Live Studies | 7,538 Sites",
    type: "Sequencing & Bioinformatics",
    category: ["Sequencing & Bioinformatics", "Computational Bioengineering", "Diagnostics & Assays"],
    shortDescription:
      "Built an end-to-end clinical trial feasibility informatics pipeline that ingests 200 live UK and EU4 oncology and immunology studies from the ClinicalTrials.gov API v2 into a normalised SQLite warehouse (7,538 active sites, 410,731 target patients). Runs analytical SQL queries for site density and sponsor recruitment burden and generates an interactive HTML dashboard.",
    websiteLink: "/demos/clinical-trial-feasibility.html",
    techStack: [
      "Python",
      "SQL (SQLite)",
      "Clinical Trials Analytics",
      "Pandas / NumPy / SciPy",
      "HTML 5",
      "Git",
    ],
    startDate: new Date("2026-11-26"),
    endDate: new Date("2026-11-26"),
    companyLogoImg: "/projects/clinical-trial-feasibility/feasibility_overview.png",
    keyMetrics: [
      {
        label: "Live Trials Ingested",
        value: "200 Studies",
        detail: "125 actively recruiting UK/EU oncology & immunology studies via ClinicalTrials.gov API v2",
      },
      {
        label: "Active Trial Sites",
        value: "7,538 Sites",
        detail: "Normalised relational SQLite locations table indexed by country and recruitment status",
      },
      {
        label: "Target Enrolment Pool",
        value: "410,731 Patients",
        detail: "Mean 2,053.7 target patients per study; patients-per-site burden segmented by sponsor class",
      },
      {
        label: "Verification",
        value: "2/2 Pytest Passing",
        detail: "Automated unit tests covering phase normalisation, SQLite ingestion, and SQL aggregations",
      },
    ],
    pagesInfoTitle: "Global Site Footprint, UK vs EU4 Density & Sponsor Recruitment Burden",
    pagesInfoArr: [
      {
        title: "Global Site Footprint & Clinical Phase Enrolment Overview",
        description:
          "Top 10 recruiting countries by active site count alongside clinical phase volume and mean target enrolment across 200 live ClinicalTrials.gov studies.",
        imgArr: ["/projects/clinical-trial-feasibility/feasibility_overview.png"],
      },
      {
        title: "UK vs EU4 Site Density & Sponsor Recruitment Burden",
        description:
          "Direct comparison of UK, Germany, France, Spain, and Italy site footprints paired with mean target patients per site across industry and academic sponsors.",
        imgArr: ["/projects/clinical-trial-feasibility/uk_eu_site_density.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Designed to replicate real-world clinical trial feasibility informatics workflows: pulling live protocol, sponsor, condition, and site metadata from the US NIH ClinicalTrials.gov REST API v2 into a normalised 3-table relational SQLite database (`trials`, `locations`, `conditions`).",
        "Pairs reproducible analytical SQL (`sql/feasibility_queries.sql`) with automated high-DPI visualisations and a standalone interactive Chart.js dashboard featuring live search and sponsor-class filtering across UK and EU4 trial sites.",
      ],
      bullets: [
        "**Live API Ingestion & Normalisation (`src/fetch_trials.py`):** Paginates ClinicalTrials.gov v2 JSON payloads and loads indexed `trials`, `locations`, and `conditions` tables into SQLite.",
        "**Analytical SQL Queries (`sql/feasibility_queries.sql`):** Computes country site density, UK vs EU4 recruitment footprints, phase enrolment distributions, and CTE-based patients-per-site burden by sponsor class.",
        "**Interactive Web Dashboard (`docs/index.html`):** Generates a filterable Chart.js feasibility explorer with direct NCT links to ClinicalTrials.gov study records.",
      ],
    },
  },
  {
    id: "medmnist-pytorch-classifier",
    companyName: "MedMNIST PyTorch Classifier & Grad-CAM",
    subtitle: "Residual CNN & Pure-PyTorch Grad-CAM Explainability for 2D Medical Imaging",
    badge: "0.9673 Held-Out Test ROC-AUC",
    type: "Sequencing & Bioinformatics",
    category: ["Sequencing & Bioinformatics", "Computational Bioengineering", "Diagnostics & Assays"],
    shortDescription:
      "Built a modular PyTorch 2D medical image classification pipeline (MedResNet residual CNN) with inverse-frequency class-weighted CrossEntropyLoss, AdamW, cosine annealing, and a pure-PyTorch Grad-CAM saliency implementation using forward and backward hooks, achieving 0.9673 held-out test ROC-AUC on PneumoniaMNIST.",
    websiteLink: "/demos/medmnist-gradcam-explorer.html",
    githubLink: "https://github.com/aahmeddev/medmnist-pytorch-classifier",
    techStack: [
      "PyTorch",
      "Deep Learning",
      "Computer Vision",
      "Grad-CAM",
      "Python",
      "Pandas / NumPy / SciPy",
      "Git",
    ],
    startDate: new Date("2026-11-22"),
    endDate: new Date("2026-11-23"),
    companyLogoImg: "/projects/medmnist-pytorch-classifier/gradcam_grid.png",
    keyMetrics: [
      {
        label: "Held-Out Test ROC-AUC",
        value: "0.9673",
        detail: "Evaluated once on 624 untouched PneumoniaMNIST paediatric chest X-rays",
      },
      {
        label: "Validation ROC-AUC",
        value: "0.9968",
        detail: "97.14% validation accuracy and 0.9637 Macro F1 on best checkpoint",
      },
      {
        label: "Explainability",
        value: "Pure-PyTorch Grad-CAM",
        detail: "Forward and full backward hooks on stage3.conv2 with bilinear upsampling",
      },
      {
        label: "Test Coverage",
        value: "3/3 Pytest Passing",
        detail: "Automated checks for forward shapes, [0, 1] saliency bounds, and weight updates",
      },
    ],
    pagesInfoTitle: "ROC Curve, Confusion Matrix & Grad-CAM Saliency Overlays",
    pagesInfoArr: [
      {
        title: "Grad-CAM Saliency Overlays on Held-Out Test Chest X-Rays",
        description:
          "Class-discriminative Grad-CAM heatmaps generated from the final convolutional layer of MedResNet to show which lung opacity regions drive each prediction.",
        imgArr: ["/projects/medmnist-pytorch-classifier/gradcam_grid.png"],
      },
      {
        title: "Held-Out Test ROC Curve & Confusion Matrix",
        description:
          "0.9673 held-out test ROC-AUC, 88.78% test accuracy, and 0.8729 Macro F1 across 624 paediatric chest X-rays using class-weighted CrossEntropyLoss.",
        imgArr: [
          "/projects/medmnist-pytorch-classifier/roc_curve.png",
          "/projects/medmnist-pytorch-classifier/confusion_matrix.png",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Modular PyTorch deep learning repository (`src/data.py`, `src/model.py`, `src/gradcam.py`, `src/train.py`, `src/evaluate.py`) supporting greyscale and RGB 2D MedMNIST clinical imaging benchmarks (`PneumoniaMNIST`, `BreastMNIST`, `PathMNIST`, `OrganAMNIST`).",
        "Designed to address medical class imbalance and black-box interpretability through inverse-frequency weighted CrossEntropyLoss, validation ROC-AUC checkpointing, and a custom hook-based Grad-CAM implementation.",
      ],
      bullets: [
        "**Residual CNN Architecture (`src/model.py`):** 3-stage MedResNet with projection skip connections, BatchNorm, global average pooling, and dropout, exposing `stage3.conv2` as the Grad-CAM target layer.",
        "**Pure-PyTorch Grad-CAM (`src/gradcam.py`):** Captures spatial activations and class-score gradients via forward and full backward hooks, global-average-pools gradients into channel weights, applies ReLU, and upsamples to input resolution.",
        "**Reproducible Training & Evaluation (`src/train.py`, `src/evaluate.py`):** Deterministic seeding, AdamW with CosineAnnealingLR, JSON metrics logging, and automated ROC, confusion matrix, and saliency grid generation.",
      ],
    },
  },
  {
    id: "nanopore-basecalling",
    companyName: "HMM Nanopore Basecaller",
    subtitle: "Numba-Accelerated 1,025-State 5-Mer Basecaller on Raw POD5 Signals",
    badge: "81% Sequence Identity vs Dorado",
    type: "Sequencing & Bioinformatics",
    category: ["Sequencing & Bioinformatics", "Bioinformatics", "Computational Bioengineering"],
    shortDescription:
      "Built a 1,025-state 5-mer Hidden Markov Model (log-space Baum-Welch EM and 4x downsampled Viterbi decoding) in Python with Numba JIT multi-core execution to decode raw nanopore POD5 ionic current reads, achieving 81% sequence identity against Oxford Nanopore Dorado.",
    websiteLink: "/blog/nanopore-basecalling",
    githubLink: "https://github.com/aahmeddev/nanopore-basecalling-project",
    blogLink: "/blog/nanopore-basecalling",
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
    companyLogoImg: "/projects/nanopore-hmm-basecaller/nanopore_mk1c_photo.jpg",
    keyMetrics: [
      {
        label: "Validated Accuracy",
        value: "81.0% Identity",
        detail: "Global Bio.Align.PairwiseAligner benchmark vs Oxford Nanopore Dorado HAC",
      },
      {
        label: "Markov State Space",
        value: "1,025 States",
        detail: "1,024 canonical 5-mers + 1 catch-all UNK state (sparse O(6N) transitions)",
      },
      {
        label: "Training Throughput",
        value: "50,000 Samples/Batch",
        detail: "Numba @njit(parallel=True, fastmath=True) log-space Baum-Welch EM",
      },
      {
        label: "Reference Alignment",
        value: "NC_000022.11 (Chr 22)",
        detail: "Two-pass multiprocessing DTW search pinned at offset 38,010,200 bp",
      },
    ],
    pagesInfoTitle: "Results, Signal Conditioning & Diagnostic Plots",
    pagesInfoArr: [
      {
        title: "Viterbi MAP 5-Mer Decoding & Baum-Welch Gaussian Emission Posteriors",
        description:
          "Left: Piecewise 5-mer Viterbi state sequence decoded over RobustScaler-normalised 4 kHz ionic current (HG002 read 2536858a). Right: Learned Gaussian emission densities (sigma >= 0.20 floor) showing homopolymer overlap vs mixed purine/pyrimidine separation.",
        imgArr: ["/projects/nanopore-hmm-basecaller/hmm_viterbi_overview.png"],
      },
      {
        title: "Two-Pass Multiprocessing DTW Alignment & 6-Feature Event PCA Projection",
        description:
          "Left: Coarse-to-fine fastdtw cost landscape across human chromosome 22 using the Nanopolish R9.4 5-mer pore model. Right: BaseSignatureAnalyzer 6-feature PCA projection (mean, std, dwell duration, median, skewness, kurtosis).",
        imgArr: ["/projects/nanopore-hmm-basecaller/dtw_pca_analysis.png"],
      },
      {
        title: "Five-Stage POD5 Signal Conditioning & Apache Arrow Architecture",
        description:
          "3x IQR outlier clipping, 5-point median filtering, 3rd-order polynomial drift subtraction, and RobustScaler normalisation streamed directly from Apache Arrow POD5 tables.",
        imgArr: [
          "/blogs/nanopore-basecalling/signal_preprocessing.jpg",
          "/blogs/nanopore-basecalling/pod5_file_structure.png",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Eight-module Python and Numba JIT basecalling pipeline (`Pod5DataLoader`, `SignalPreprocessor`, `BaseSignatureAnalyzer`, `SignalAligner`, `HMMBasecaller`, `SignalVisualizer`, `main_test`, `evaluate_accuracy`) decoding 4 kHz raw Oxford Nanopore `.pod5` ionic current traces from first principles.",
        "Restricting the transition graph to self-loops ($p_{\\text{stay}} = 0.50$), catch-all escape ($p_{\\text{to\\_unknown}} = 0.05$), and the 4 valid step-1 overlapping 5-mer successors ($p_{\\text{step}} = 0.1125$) inside pre-filtered `NumbaList` adjacency lists cuts per-step complexity by 200x from dense $O(N^2)$ to sparse $O(6N)$.",
      ],
      bullets: [
        "**POD5 Ingestion & Conditioning (`signal_preprocessor.py`):** Context-managed `pod5.Reader` streaming followed by $3\\times\\text{IQR}$ spike clipping, 5-point `medfilt`, 3rd-degree polynomial baseline drift removal, `RobustScaler` z-IQR standardisation, and MAD derivative event segmentation.",
        "**Exploratory Signature Clustering (`base_signature_analyzer.py`):** Extracts 6 moments per event plateau (`mean`, `std`, `duration`, `median`, `skewness`, `kurtosis`) for PCA dimensionality reduction, Ward hierarchical dendrograms, and K-Means clustering.",
        "**Zero-Copy Two-Pass Parallel DTW (`signal_aligner.py`):** Downsamples query traces by the physical translocation ratio ($4000\\text{ Hz} / 450\\text{ bp s}^{-1}$) and distributes coarse-to-fine `fastdtw` windows across CPU cores via `Pool.imap_unordered` with `_init_worker` shared reference memory.",
        "**Log-Space Numba Kernels (`hmm_basecaller.py`):** Custom `@njit(fastmath=True)` `_logsumexp_jit` kernel preventing IEEE-754 underflow across `_forward_pass_log_jit`, `_backward_pass_log_jit`, 50,000-sample batched Baum-Welch EM ($\sigma_i \\ge 0.20$ floor), and $4\\times$ downsampled Viterbi decoding (`viterbi_downsample_factor = 4`).",
        "**Dorado Benchmark (`evaluate_accuracy.py`):** Global pairwise alignment (`Bio.Align.PairwiseAligner`) against Oxford Nanopore Dorado (`dna_r10.4.1_e8.2_400bps_hac@v5.0.0`) confirming 81.0% sequence identity on human GIAB `HG002` reads.",
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
    websiteLink: "/blog/myowave-ehg-diagnostics",
    githubLink: "https://github.com/aahmeddev/DAPP2_MOL_Group_F-MYOWAVE",
    blogLink: "/blog/myowave-ehg-diagnostics",
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
    companyLogoImg: "/projects/myowave-ehg/pcb_angled_3d.png",
    keyMetrics: [
      {
        label: "Departmental Award",
        value: "1st Place Prize",
        detail: "Year 2 Molecular Bioengineering Prize for Best Design Group Project",
      },
      {
        label: "Analogue Front-End",
        value: "24-Bit ADS1299",
        detail: "8-channel simultaneous delta-sigma ADC at 24x PGA gain (22.3 nV LSB)",
      },
      {
        label: "Real-Time DSP Rate",
        value: "250 Hz Pipeline",
        detail: "4th-order zero-phase Butterworth (0.34 - 1.0 Hz) & Welch FWL/FWH PSD",
      },
      {
        label: "Clinical Architecture",
        value: "Dual NiceGUI Apps",
        detail: "Clinician dashboard (:8081) & patient diary (:8082) + Firebase/SQLite",
      },
    ],
    pagesInfoTitle: "KiCad 3D PCB Renders, Copper Layouts & 250 Hz DSP Output",
    pagesInfoArr: [
      {
        title: "250 Hz Butterworth Bandpass Recovery & Welch FWL/FWH Spectral Density",
        description:
          "Left: Zero-phase 4th-order Butterworth bandpass filtering (0.34 to 1.0 Hz) isolating uterine myometrial bursts from 50 Hz mains noise and respiration drift. Right: Welch Power Spectral Density across Fast Wave Low (0.13 - 0.34 Hz) and Fast Wave High (0.34 - 1.0 Hz) diagnostic bands.",
        imgArr: ["/projects/myowave-ehg/ehg_dsp_pipeline.png"],
      },
      {
        title: "3D KiCad Renders of the Custom ADS1299-6PAGR Biopotential Acquisition Shield",
        description:
          "Isometric and top 3D board renders showing the 64-pin TQFP ADS1299-6PAGR front-end, differential Ag/AgCl electrode headers, passive RC input filters, and isolated +2.5V/+3.3V/+5V supply regulation.",
        imgArr: [
          "/projects/myowave-ehg/pcb_angled_3d.png",
          "/projects/myowave-ehg/pcb_top_3d.png",
        ],
      },
      {
        title: "KiCad Copper Routing & Differential Signal Isolation",
        description:
          "PCB copper layout separating microvolt differential analog input networks from high-speed SPI digital clock lines.",
        imgArr: [
          "/projects/myowave-ehg/pcb_top_layout.png",
          "/projects/myowave-ehg/pcb_angled_layout.png",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Non-invasive wearable Electrohysterography (EHG) acquisition and longitudinal telemetry platform engineered for the ENDO1000 endometriosis clinical research study. Personally owned all electronic hardware schematics, embedded DAC synthesis firmware, real-time 250 Hz DSP algorithms, and full-stack web portals.",
      ],
      bullets: [
        "**KiCad Biopotential Hardware (`MYOWAVE.kicad_sch`):** Integrated a Texas Instruments `ADS1299-6PAGR` 24-bit biopotential ADC with Driven-Right-Leg (DRL) common-mode cancellation and Arduino Uno/Due SPI shield headers; verified passband flatness and 50 Hz CMRR in Python (`T3_CMRR.py`).",
        "**Synthetic Physiological Uterus DAC (`EHG_Generator.ino`):** Programmed an Arduino Due 12-bit hardware DAC ($115,200\\text{ baud}$) synthesising $0.05\\text{ Hz}$ slow-wave envelopes modulated by FWL ($0.13\\text{ to }0.34\\text{ Hz}$) and FWH ($0.34\\text{ to }1.0\\text{ Hz}$) action-potential bursts.",
        "**Threaded 250 Hz DSP Engine (`background_service.py`, `dsp_math.py`):** Zero-phase Butterworth bandpass conditioning (`scipy.signal.filtfilt`), sliding RMS burst detection, and Welch PSD feature extraction.",
        "**Dual NiceGUI + Firebase Portals:** Built an authenticated clinician dashboard (`port 8081`) and mobile participant symptom diary (`port 8082`) with interactive Plotly charts, dual Firebase Firestore sync, and local SQLite persistence.",
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
    websiteLink: "/blog/custom-ccd-spectrophotometer",
    blogLink: "/blog/custom-ccd-spectrophotometer",
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
    companyLogoImg: "/projects/pulse-oximeter-spectrophotometer/cad_isometric.png",
    keyMetrics: [
      {
        label: "Optical Grating Angle",
        value: "46.064° Incidence",
        detail: "Derived for 900 lines/mm grating to center m = 1 (532 nm) on CCD",
      },
      {
        label: "Linear Detector Array",
        value: "3,648 CCD Pixels",
        detail: "Toshiba TCD1304 (8 um pitch, 29.1 mm window) driven by STM32F401RE",
      },
      {
        label: "Laser Calibration Fit",
        value: "R² > 0.999 Linear",
        detail: "Three-point centroid regression across 405 nm, 532 nm, and 650 nm lasers",
      },
      {
        label: "Biopotential Acquisition",
        value: "8-Ch SPI ADS1299",
        detail: "Embedded C firmware & real-time Python physiological waveform UI",
      },
    ],
    pagesInfoTitle: "SolidWorks 3D Optical CAD & Calibrated Spectral Results",
    pagesInfoArr: [
      {
        title: "Three-Laser Wavelength Calibration (405 / 532 / 650 nm) & Chemical Identification Proof",
        description:
          "Left: Linear pixel-to-wavelength regression across violet (405 nm), green (532 nm), and red (650 nm) laser peaks. Right: Quantitative spectral matching of unknown chromophores and fluorophores against commercial reference baselines.",
        imgArr: [
          "/projects/pulse-oximeter-spectrophotometer/laser_calibration.png",
          "/projects/pulse-oximeter-spectrophotometer/chemical_id_proof.png",
        ],
      },
      {
        title: "Normalised Transmission Absorbance & 90-Degree Fluorescence Spectra (n = 5)",
        description:
          "Multi-replicate absorbance and orthogonal fluorescence emission curves with ±1 SD bands captured on the custom 3D-printed spectrophotometer.",
        imgArr: [
          "/projects/pulse-oximeter-spectrophotometer/absorbance_combined.png",
          "/projects/pulse-oximeter-spectrophotometer/fluorescence_combined.png",
        ],
      },
      {
        title: "SolidWorks Stray-Light Baffle Architecture: Sawtooth Ceiling & 45° Zero-Order V-Trap",
        description:
          "Internal CAD cross-sections showing the asymmetrical sawtooth lid baffle teeth and the concave 45-degree specular V-trap engineered to extinguish zero-order (m = 0) and grazing reflections.",
        imgArr: [
          "/projects/pulse-oximeter-spectrophotometer/cad_improvements_breakdown.png",
          "/projects/pulse-oximeter-spectrophotometer/cad_lid_grating.png",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Two complete bioinstrumentation builds combining SolidWorks optical enclosure design, STM32 and Arduino Embedded C firmware, high-speed SPI biopotential acquisition, and Python spectral calibration.",
      ],
      bullets: [
        "**Full-Stack 8-Channel Pulse Oximeter (Hardware & Software Lead):** Interfaced an 8-channel `ADS1299` biopotential ADC with an Arduino microcontroller over SPI using Embedded C firmware and a real-time Python physiological modelling and visualisation interface (building on a Year 1 I2C Maxim `MAX30101`/`MAX32664` prototype).",
        "**SolidWorks Optical Enclosure (`Ahmed_Casing.SLDASM`, 79% Report Mark):** Modelled a light-tight 3D-printed housing integrating ThorLabs/Newport mounts, a 900 lines/mm transmission diffraction grating ($46.064^\\circ$ incidence angle), an asymmetrical sawtooth ceiling baffle, and a concave $45^\\circ$ zero-order V-trap.",
        "**STM32 + TCD1304 Linear CCD Calibration:** Calibrated the 3,648-pixel Toshiba `TCD1304` detector in Python (`scipy.stats.linregress`) against $405\\text{ nm}$, $532\\text{ nm}$, and $650\\text{ nm}$ laser peaks to quantify transmission absorbance ($A = -\\log_{10}(I/I_0)$) and $90^\\circ$ fluorescence.",
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
    websiteLink: "/projects/dna-quality-control-toolkit/SRR490124_2_quality_report.html",
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
    companyLogoImg: "/projects/dna-quality-control-toolkit/welcome_page.png",
    keyMetrics: [
      {
        label: "Diagnostic Coverage",
        value: "9 FastQC Modules",
        detail: "Automated PASS / WARN / FAIL traffic-light grading in ModuleEvaluator.java",
      },
      {
        label: "Concurrency Model",
        value: "Dual Thread Pools",
        detail: "Separate analysisExecutor (GZIP streaming) & plotExecutor (N_cores - 1)",
      },
      {
        label: "Visualisation Bridge",
        value: "7 Python Scripts",
        detail: "Zero-temp-file stdin CSV piping into headless Agg Matplotlib workers",
      },
      {
        label: "Standalone Export",
        value: "Plotly.js v2.30 HTML",
        detail: "Jackson JSON serialisation into single-file interactive QC reports",
      },
    ],
    pagesInfoTitle: "JavaFX Desktop Interface, Diagnostic Plots & Live HTML Report",
    pagesInfoArr: [
      {
        title: "Automated 9-Module FastQC Grading & 10 Scientific Diagnostic Charts",
        description:
          "Left: Per-base Phred quality and base composition summary validated on E. coli K-12 MG1655 (SRR490124). Right: Headless Matplotlib diagnostic plots piped over stdin into the JavaFX plotNodeCache.",
        imgArr: [
          "/projects/dna-quality-control-toolkit/base_statistics.png",
          "/projects/dna-quality-control-toolkit/data_examples.png",
        ],
      },
      {
        title: "Multi-Tab Drag-and-Drop Workspace & Asynchronous Read Trimming",
        description:
          "Left: Multi-tab FASTQ workspace with persistent recent-file history. Right: Sliding-window Phred quality and adapter trimming UI with immediate re-analysis.",
        imgArr: [
          "/projects/dna-quality-control-toolkit/welcome_page.png",
          "/projects/dna-quality-control-toolkit/trimming.png",
        ],
      },
      {
        title: "Open Live Interactive Plotly.js HTML QC Report (SRR490124_2)",
        description:
          "Inspect a real standalone HTML quality control report generated by HtmlReportGenerator.java.",
        imgArr: [],
        linkURL: "/projects/dna-quality-control-toolkit/SRR490124_2_quality_report.html",
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Cross-language desktop bioinformatics suite built in Java 22 and JavaFX 24 (Maven build with Jackson 2.17.0 and fat-JAR assembly) paired with a 7-script Python Matplotlib scientific plotting backend.",
      ],
      bullets: [
        "**Streaming FASTQ Parser (`FastqAnalysisTask.java`):** Streams uncompressed `.fastq` and `GZIPInputStream` `.fastq.gz` 4-line records with live `ReadOnlyLongProperty` progress bindings and a fast 100k-read preview mode.",
        "**9-Module Rule Engine (`ModuleEvaluator.java`):** Grades Per Base Sequence Quality (WARN $< 20$, FAIL $< 10$ median Phred), Per Sequence Quality, Base Content, GC Content (WARN $> 15\\%$, FAIL $> 30\\%$ normal deviation), N Content, Length Distribution, Duplication, Overrepresented Sequences, and Adapter Content.",
        "**Read Trimming (`TrimmingTask.java`):** Asynchronous 5' and 3' sliding-window Phred trimming, adapter stripping, and minimum-length filtering.",
        "**Java-to-Python Stdin Piping (`PlotGenerator.java`, `HtmlReportGenerator.java`):** Pipes CSV summaries over `stdin` to 7 headless `Agg` Matplotlib scripts with thread-safe `plotNodeCache`, and exports standalone interactive `Plotly.js` HTML5 reports.",
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
    companyLogoImg: "/projects/gene-expression-explorer/clustered_heatmap.png",
    keyMetrics: [
      {
        label: "Supported Formats",
        value: "CSV / TSV / XLSX / GZ",
        detail: "Universal delimiter inference & duplicate gene symbol aggregation",
      },
      {
        label: "Cohort Classifier",
        value: "Heuristic Auto-Split",
        detail: "Keyword token & 2-to-5-char prefix/suffix balanced cohort detection",
      },
      {
        label: "Statistical Engine",
        value: "Vectorised Welch t",
        detail: "@st.cache_data log2(x+1) transform, log2FC & scipy.stats.ttest_ind",
      },
      {
        label: "Visual Outputs",
        value: "300 DPI + Plotly",
        detail: "Z-score RdBu_r Seaborn Ward clustermap, volcano plot & gene boxplots",
      },
    ],
    pagesInfoTitle: "Differential Expression Plots & Live Cloud Application",
    pagesInfoArr: [
      {
        title: "Volcano Plot & Row Z-Score Differential Expression Matrix",
        description:
          "Simultaneous fold-change vs statistical significance filtering (-log10 p-value against log2 fold change) paired with row-wise Z-score standardisation across case and control cohorts.",
        imgArr: ["/projects/gene-expression-explorer/volcano_heatmap_overview.png"],
      },
      {
        title: "Seaborn Hierarchical Ward Clustermap with Cohort Annotation Tracks",
        description:
          "300 DPI row-normalised (z_score = 0) RdBu_r hierarchical clustered heatmap with colour-coded sample cohort bars.",
        imgArr: ["/projects/gene-expression-explorer/clustered_heatmap.png"],
      },
      {
        title: "Launch Gene Expression Explorer Live on Streamlit Cloud",
        description:
          "Upload expression matrices, auto-detect sample cohorts, tune p-value and log2FC cutoffs, and export publication PNGs and DEG CSVs.",
        linkURL: "https://gene-expression-explorer.streamlit.app",
        imgArr: [],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "End-to-end Python and Streamlit differential transcriptomics platform (`geo_app.py`) accepting arbitrary bulk RNA-seq or microarray count/intensity matrices.",
      ],
      bullets: [
        "**Universal Matrix Loader (`load_data`):** Parses `.csv`, `.tsv`, `.txt`, `.xlsx`, `.xls`, and gzipped `.csv.gz`/`.txt.gz` matrices, separating gene symbol columns from numeric sample columns and averaging duplicate symbols.",
        "**Heuristic Cohort Detector (`detect_sample_groups`):** Scans column names for clinical tokens (`TUMOR`/`NORMAL`, `CASE`/`CTRL`, `TREATED`/`CONTROL`) and shared 2-to-5-character prefixes/suffixes, plus external metadata CSV mapping.",
        "**Cached Differential Engine (`process_expression_data`):** Low-expression filtering, optional $\\log_2(x + 1)$ transformation, and vectorised two-sample Student/Welch t-tests (`scipy.stats.ttest_ind`).",
        "**Linked Publication Visuals:** Pairs 300 DPI Z-score `seaborn.clustermap` figures with interactive hover-enabled `plotly.express` volcano plots and jittered replicate boxplots (`points='all'`).",
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
    companyLogoImg: "/projects/phreeqc-speciation/water_quality_sampling_photo.jpg",
    keyMetrics: [
      {
        label: "Commercial Impact",
        value: "£40,000 R&D Grant",
        detail: "STFC / Harwell Campus grant + 3 corporate R&D partnerships secured",
      },
      {
        label: "Dataset Throughput",
        value: "35,232 Sensor Rows",
        detail: "Parallel multi-catchment hydrochemical speciation (NH3 mol/kgw)",
      },
      {
        label: "Thermodynamic Models",
        value: "13 Bundled Databases",
        detail: "phreeqc.dat, minteq.v4.dat, wateq4f.dat, llnl.dat, pitzer.dat, sit.dat",
      },
      {
        label: "Execution Architecture",
        value: "ProcessPool C++ DLL",
        detail: "Persistent per-worker libiphreeqc.dll/.so initialisation (_init_worker)",
      },
    ],
    pagesInfoTitle: "Speciation Output & Multi-Core C++ Worker Scaling",
    pagesInfoArr: [
      {
        title: "Aqueous Ammonia/Carbonate Equilibrium Speciation & Multi-Core Throughput Scaling",
        description:
          "Left: Non-linear thermodynamic distribution of un-ionised NH3(aq) vs NH4+ across pH. Right: Multi-core throughput scaling using persistent per-worker IPhreeqc C++ instances.",
        imgArr: ["/projects/phreeqc-speciation/phreeqc_parallel_benchmark.png"],
      },
      {
        title: "Empirical River Catchment Un-Ionised Ammonia (NH3) Speciation Output",
        description:
          "Direct speciation trajectory generated by phreeqc-python-tool across multi-parameter river telemetry.",
        imgArr: ["/projects/phreeqc-speciation/NH3_speciation_plot.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Installable Python package (`phreeqc_project` v0.1.0) co-developed over Git at Nanolyse Technologies Ltd. (Harwell Science and Innovation Campus), coupling the USGS `IPhreeqc` C++ engine with multi-core Python batch execution and MATLAB/Excel decision models.",
      ],
      bullets: [
        "**Persistent Multi-Core C++ Wrapper (`PhreeqcBatchRunner`):** Uses `ProcessPoolExecutor` with a persistent worker initialiser (`_init_worker`) that loads `libiphreeqc.dll`/`.so` and one of 13 thermodynamic databases once per CPU core.",
        "**Telemetry Sanitization (`clean_water_quality_file`):** Automated ingestion of `.xls`/`.xlsx`/`.csv` water sensor logs, stripping faulty sensor flags and repairing Excel serial timestamps across pH, temperature, nitrite, nitrate, ammonium, DO, and conductivity.",
        "**Commercial Grant Validation:** Ran parallel speciation across 35,232 dual-catchment records to model toxic un-ionised ammonia (`NH3`), supporting executive pitches that won a £40,000 commercial grant and 3 corporate R&D partnerships.",
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
    websiteLink: "/blog/diabetic-wound-epigenetics",
    blogLink: "/blog/diabetic-wound-epigenetics",
    techStack: [
      "Mammalian Cell Culture",
      "RT-PCR & Bisulphite Seq",
      "Python",
      "MATLAB",
      "Pandas / NumPy / SciPy",
    ],
    startDate: new Date("2025-10-15"),
    endDate: new Date("2026-05-15"),
    companyLogoImg: "/projects/diabetic-wound-epigenetics/rtpcr_gel_results.jpg",
    keyMetrics: [
      {
        label: "COL1A1 Hypermethylation",
        value: "13.1% -> 36.4%",
        detail: "20 bisulphite-sequenced clones (p = 0.002) under 80.5 mM glucose",
      },
      {
        label: "QD Trap Passivation",
        value: "FWHM -50.4%",
        detail: "Oleylamine ligand treatment halved CdSe emission FWHM (185.2 -> 91.9 nm)",
      },
      {
        label: "Enzyme Inhibition",
        value: "Ki = 463 uM",
        detail: "Acid phosphatase competitive inhibition & Ea = 59.84 kJ/mol in MATLAB",
      },
      {
        label: "Academic Assessment",
        value: "84.38% & 84.00%",
        detail: "First Class marks across Molecular/Cellular & Nanomaterials reports",
      },
    ],
    pagesInfoTitle: "Epigenetic Bisulphite Plots, RT-PCR Gels & Nanomaterial Spectra",
    pagesInfoArr: [
      {
        title: "COL1A1 Promoter CpG Hypermethylation (p = 0.002) & RT-PCR Transcriptional Remodelling",
        description:
          "Left: Bisulphite sequencing across 20 bacterial clones showing a 2.78x jump in COL1A1 promoter methylation under 80.5 mM hyperglycaemia. Right: Relative RT-PCR expression shifts across COL1A1, MMP1, NOX4, and IL6 normalised to GAPDH.",
        imgArr: ["/projects/diabetic-wound-epigenetics/cpg_methylation_summary.png"],
      },
      {
        title: "2% Agarose Gel Electrophoresis of 35-Cycle RT-PCR Amplicons (Group 7)",
        description:
          "Experimental UV transilluminator gel photograph resolving GAPDH, COL1A1, MMP1, NOX4, and IL6 amplicons from 14-day primary human dermal fibroblast cultures.",
        imgArr: ["/projects/diabetic-wound-epigenetics/rtpcr_gel_results.jpg"],
      },
      {
        title: "Gold Nanorod Gans Plasmon Modes, Zeldovich Nucleation & CdSe Quantum Dot Passivation",
        description:
          "High-resolution UV-Vis absorbance and photoluminescence profiles alongside non-equilibrium Zeldovich burst nucleation kinetic models.",
        imgArr: [
          "/projects/diabetic-wound-epigenetics/nanorod_qd_absorbance.png",
          "/projects/diabetic-wound-epigenetics/nucleation_model_comparison.png",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Wet-lab molecular bioengineering and nanomaterials investigations pairing mammalian cell culture, nucleic acid extraction, and colloidal synthesis with Python and MATLAB modelling.",
      ],
      bullets: [
        "**Diabetic Wound Senescence & RT-PCR (84.38% Mark):** 14-day primary human dermal fibroblast culture ($80.5\\text{ mM}$ vs $5.0\\text{ mM}$ glucose), Qiagen RNeasy Plus RNA extraction, SuperScript IV cDNA synthesis, and 35-cycle RT-PCR across *COL1A1*, *MMP1*, *NOX4*, *IL6*, and *GAPDH*.",
        "**Sodium Bisulphite Sequencing ($p = 0.002$):** Aligned 20 cloned promoter alleles in CodonCode Aligner and Python, confirming *COL1A1* CpG hypermethylation from $13.1\\% \\pm 3.0\\%$ to $36.4\\% \\pm 6.3\\%$.",
        "**Gold Nanorods & CdSe Quantum Dots (84.00% Mark):** Fitted Gans dipole plasmon modes and Zeldovich burst nucleation kinetics in Python; passivated CdSe deep surface traps with oleylamine, halving fluorescence FWHM from $185.2\\text{ nm}$ to $91.9\\text{ nm}$.",
        "**Analytical Spectroscopy & Enzyme Kinetics:** Assigned aspirin across $600.25\\text{ MHz}$ $^1\\text{H}$ NMR and ATR-FTIR; quantified acid phosphatase competitive inhibition ($K_i = 463\\,\\mu\\text{M}$, $E_a = 59.84\\text{ kJ}\\cdot\\text{mol}^{-1}$, $\\text{pH } 5.322$) in MATLAB.",
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
    companyLogoImg: "/projects/cpp-physics-boids-engine/boids_softbody_sim.png",
    keyMetrics: [
      {
        label: "Neighbour Lookup",
        value: "O(1) Spatial Hash",
        detail: "3x3 cell query eliminating quadratic O(N²) pairwise scans",
      },
      {
        label: "Memory Layout",
        value: "Contiguous SoA",
        detail: "Structure-of-Arrays (BoidData) for L1/L2 CPU cache locality",
      },
      {
        label: "Physics Sub-Stepping",
        value: "Δt = 1/1600 s",
        detail: "20 iterative Hookean spring-constraint solver passes per tick",
      },
      {
        label: "Concurrency & Frame Rate",
        value: "std::thread @ 120 FPS",
        detail: "Multi-core force evaluation with deterministic frame-time clamping",
      },
    ],
    pagesInfoTitle: "Spatial-Hash Partitioning & 2D Hookean Lattice Diagnostics",
    pagesInfoArr: [
      {
        title: "O(N) Spatial-Hash Grid Partitioning & 2D Hookean Spring-Mass Deformation",
        description:
          "Left: 3x3 spatial-hash cell queries enabling 2,500+ autonomous agents at 60+ FPS. Right: 2D Hookean structural, shear, and bend spring-mass lattice deforming under penalty boundary impact.",
        imgArr: ["/projects/cpp-physics-boids-engine/boids_softbody_sim.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Two standalone C++17 simulation engines built with CMake (`FetchContent`) and statically linked SFML 3.0.0 exploring data-oriented memory layout and numerical constraint stability.",
      ],
      bullets: [
        "**Multi-Threaded Boid Flocking (`Boid Simulation`):** Refactored agent state into a contiguous Structure-of-Arrays (`BoidData`) layout, implemented $O(1)$ spatial-hash grid partitioning (`SpacialHash.cpp`), and parallelised force evaluation across `std::thread` workers.",
        "**2D Soft-Body Physics (`SoftBodyMechanics`):** Implemented Verlet position integration with 20 iterative Hookean spring-constraint passes per tick, decoupling a deterministic $1/1600\\text{ s}$ physics step from a 120 FPS render loop.",
      ],
    },
  },
];

export const featuredExperiences = Experiences.slice(0, 3);
