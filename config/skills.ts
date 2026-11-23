import { Icons } from "@/components/common/icons";

export interface skillsInterface {
  name: string;
  description: string;
  category: string;
  evidence: string;
  rating: number;
  icon: any;
}

export interface SkillPillarInterface {
  id: string;
  title: string;
  subtitle: string;
  highlight: string;
  skills: string[];
}

export const skillPillars: SkillPillarInterface[] = [
  {
    id: "sequencing-bioinformatics",
    title: "Sequencing, Bioinformatics & Scientific Computing",
    subtitle:
      "Probabilistic signal decoding, multi-threaded genomic quality control, and high-throughput analytical pipelines.",
    highlight: "81% HMM Nanopore Basecaller (vs Dorado) & Multi-Threaded FASTQ QC Suite",
    skills: [
      "Python 3 (Numba JIT, multiprocessing)",
      "PyTorch, Deep Learning & Computer Vision (MedResNet CNN, Grad-CAM)",
      "POD5 / FASTQ / FASTA Signal & Read Parsing",
      "Hidden Markov Models (Baum-Welch, Viterbi)",
      "Dynamic Time Warping (DTW) Signal Alignment",
      "Biopython (Bio.SeqIO, Bio.Align) & Dorado Benchmarking",
      "Java 22 & JavaFX (ExecutorService Concurrency)",
      "Pandas, NumPy, SciPy & statsmodels (Tukey HSD)",
      "Streamlit, NiceGUI, Plotly, Seaborn & Matplotlib",
      "CodonCode Aligner (Bisulphite CpG Methylation)",
      "PHREEQC (phreeqpy, USGS IPhreeqc C++ Library)",
    ],
  },
  {
    id: "wet-lab-bioanalytical",
    title: "Wet-Lab Bioassays, Chromatography & Molecular Biology",
    subtitle:
      "Hands-on diagnostic assay optimisation, bioconjugation chemistry, flow cytometry, and GLP protocol authorship.",
    highlight: "30% miRFlow Cancer Assay Gain & 50+ Conjugates Purified via RP-HPLC",
    skills: [
      "Reverse-Phase HPLC (C18 Column, UV 280 nm)",
      "Thiol-Maleimide Michael Addition Bioconjugation",
      "Beckman Coulter CytoFlex Flow Cytometry (CytExpert)",
      "FlowJo Singlet & Conjugate Gating Analysis",
      "Peptide Nucleic Acid (PNA) & Streptavidin Microbead Assays",
      "Full-Factorial Buffer Design of Experiments (3x3x3 Matrix)",
      "Mammalian Cell Culture (Primary Human Dermal Fibroblasts)",
      "Qiagen RNeasy RNA Extraction & SuperScript IV cDNA Synthesis",
      "RT-PCR, Bisulphite Sequencing & Agarose Gel Electrophoresis",
      "UV-Vis, Fluorescence, FTIR & 600 MHz 1H NMR Spectroscopy",
      "Automated Liquid Handling, Centrifugation & GLP SOPs",
    ],
  },
  {
    id: "embedded-hardware-systems",
    title: "C++17 Systems, Embedded Bioinstrumentation & 3D CAD",
    subtitle:
      "Low-level firmware, 24-bit biopotential front-ends, optical housing CAD, and real-time physiological DSP.",
    highlight: "Year 2 Prize for Best Design Group Project (MYOWAVE KiCad/ADS1299 Platform)",
    skills: [
      "C++17 (Structure-of-Arrays, std::thread, CMake, SFML 3.0)",
      "C & Embedded C Firmware",
      "Texas Instruments ADS1299 24-Bit Biopotential ADC",
      "Arduino Due (12-Bit DAC) & Arduino Uno",
      "STM32 Nucleo-F401RE & Toshiba TCD1304 Linear CCD",
      "SPI, I2C, UART / PySerial & Bluetooth RFCOMM",
      "KiCad Multi-Board PCB Schematic & Layout Design",
      "SolidWorks 3D CAD (Enclosures & Optical Stray-Light Baffles)",
      "MATLAB & Simulink (Butterworth/Welch DSP, PID Control, ODEs)",
      "LTspice Analogue Simulation & Intel Quartus Digital Logic",
    ],
  },
  {
    id: "software-strategy-leadership",
    title: "Full-Stack Engineering, R&D Strategy & Governance",
    subtitle:
      "Cloud-connected clinical portals, technical business cases, grant writing, and executive budget management.",
    highlight: "£40k STFC/Harwell R&D Grant, 3 Corporate Partnerships & £26k Club Budget",
    skills: [
      "Next.js 14, React, TypeScript & Tailwind CSS",
      "Firebase Firestore Cloud Sync & SQLite Persistence",
      "Git, GitHub Actions CI/CD & Apache Maven",
      "LaTeX (XeLaTeX Scientific & Technical Typesetting)",
      "Technical Business Cases & Functional Specifications",
      "R&D Grant Writing (£40,000 Secured) & Biosensor Market Strategy",
      "Microsoft Excel Financial, Forecast & Decision Modelling",
      "Figma & PowerPoint Dual-Layer Executive Decks",
      "McKinsey Forward Programme Graduate (2026)",
      "Executive Governance (£26,000 Budget, 110+ Members)",
    ],
  },
];

export const skillsUnsorted: skillsInterface[] = [
  {
    name: "Python & Numba JIT",
    category: "Sequencing & Bioinformatics",
    description:
      "Log-space 1,025-state HMM nanopore basecaller, multi-core PHREEQC batch runners, and SciPy 250 Hz biosignal pipelines.",
    evidence: "93.75% in Programming 2 | 81% HMM Basecaller",
    rating: 5,
    icon: Icons.python,
  },
  {
    name: "PyTorch, Deep Learning & Computer Vision",
    category: "Medical Imaging & AI",
    description:
      "Custom residual CNN architectures (MedResNet), class-weighted training with AdamW and cosine annealing, and pure-PyTorch Grad-CAM saliency maps.",
    evidence: "0.9673 Held-Out Test ROC-AUC (PneumoniaMNIST)",
    rating: 5,
    icon: Icons.python,
  },
  {
    name: "Reverse-Phase HPLC & Flow Cytometry",
    category: "Wet-Lab Bioanalysis",
    description:
      "Thiol-maleimide PNA-backfiller synthesis, C18 RP-HPLC purification (50+ conjugates), CytoFlex acquisition, and FlowJo gating.",
    evidence: "30% miRFlow Assay Gain (Ladame Lab Spinout)",
    rating: 5,
    icon: Icons.work,
  },
  {
    name: "C++17 & Embedded C",
    category: "Systems & Bioinstrumentation",
    description:
      "Multi-threaded Structure-of-Arrays simulations, 120 FPS soft-body solvers, and SPI/I2C firmware for ADS1299 and STM32.",
    evidence: "8-Ch Pulse Oximeter & C++17 Boids/SoftBody",
    rating: 5,
    icon: Icons.cpp,
  },
  {
    name: "Java 22 & JavaFX Concurrency",
    category: "Bioinformatics Software",
    description:
      "Multi-threaded desktop FASTQ quality control suite using ExecutorService worker pools and automated Python report generation.",
    evidence: "DNA QC Toolkit (QCToolkit)",
    rating: 5,
    icon: Icons.java,
  },
  {
    name: "KiCad PCB & SolidWorks 3D CAD",
    category: "Hardware & Optical CAD",
    description:
      "Multi-board ADS1299 biopotential schematics, wearable enclosures, and stray-light-baffled CCD spectrophotometer housings.",
    evidence: "Best Design Group Project Prize (MYOWAVE)",
    rating: 5,
    icon: Icons.settings,
  },
  {
    name: "MATLAB, Simulink & Biosignal DSP",
    category: "Mathematical Modelling",
    description:
      "Butterworth/Welch spectral analysis, EMG/EEG/ECG/EHG filtering, Arrhenius enzyme kinetics, and s-plane PID control.",
    evidence: "100% Signals & Control Progress Tests",
    rating: 5,
    icon: Icons.matlab,
  },
  {
    name: "Biopython, POD5 & Genomics",
    category: "Genomics & Epigenetics",
    description:
      "Raw POD5 ionic current ingestion, DTW reference alignment, Dorado benchmarking, RT-PCR, and CpG bisulphite sequencing.",
    evidence: "COL1A1 Hypermethylation (p = 0.002)",
    rating: 5,
    icon: Icons.python,
  },
  {
    name: "Next.js, NiceGUI, Streamlit & Git",
    category: "Full-Stack & Cloud",
    description:
      "Dual researcher/patient clinical portals with Firebase Firestore sync, live Streamlit transcriptomics apps, and Git CI/CD.",
    evidence: "MYOWAVE Portals & Gene Expression Explorer",
    rating: 5,
    icon: Icons.git,
  },
  {
    name: "R&D Commercial Strategy & Governance",
    category: "Biotech Strategy",
    description:
      "AI/ML chemical speciation business cases, biosensor market research, and executive financial modelling in Microsoft Excel.",
    evidence: "£40k R&D Grant, 3 Partnerships & £26k Budget",
    rating: 5,
    icon: Icons.star,
  },
];

export const skills = skillsUnsorted;
export const featuredSkills = skillsUnsorted.slice(0, 6);
