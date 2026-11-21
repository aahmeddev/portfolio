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
      "Built a 1,025-state 5-mer Hidden Markov Model (Baum-Welch training and Viterbi decoding) from scratch in Python with Numba JIT multi-core execution to decode raw nanopore POD5 ionic current reads, achieving 81% sequence identity against Oxford Nanopore Dorado.",
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
    companyLogoImg: "/portfolio/projects/nanopore-basecalling/cover.svg",
    pagesInfoTitle: "Architecture & Deep-Dive Article",
    pagesInfoArr: [
      {
        title: "POD5 Signal Ingestion & Preprocessing",
        description:
          "Extracted raw picoampere ionic current traces from Oxford Nanopore POD5 archives (HG002 human reference reads) and applied median-shift/MAD normalisation across segmented events.",
        imgArr: ["/portfolio/blogs/nanopore-basecalling/pod5_file_structure.png"],
      },
      {
        title: "Two-Pass Dynamic Time Warping & 5-Mer Pore Model",
        description:
          "Aligned raw current levels against the GRCh38 reference genome using a 1,024-state DNA 5-mer pore lookup table and parallelised two-pass dynamic time warping.",
        imgArr: ["/portfolio/blogs/nanopore-basecalling/signal_preprocessing.jpg"],
      },
      {
        title: "Read the Full Engineering Blog Post",
        description:
          "Full mathematical derivation of log-space forward-backward passes, Numba @njit parallelisation, and Dorado benchmark evaluation.",
        imgArr: [],
        linkURL: "/portfolio/blog/nanopore-basecalling",
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Nanopore sequencers measure continuous ionic current disruptions (in picoamperes) as single-stranded DNA translocates through a biological nanopore at roughly 400 to 450 bases per second. Because approximately 5 nucleotides occupy the pore constriction simultaneously, each current plateau reflects a 5-mer context ($4^5 = 1,024$ states) complicated by stochastic translocation dwell times and sensor noise.",
        "To investigate probabilistic basecalling from first principles, I engineered a custom 1,025-state Hidden Markov Model (1,024 canonical 5-mers plus a catch-all state) in Python without relying on pre-built HMM libraries. The model restricts transition topology to biologically valid step-forward (4 branches) and stay-in-place (1 self-loop) transitions per state, cutting dense $O(N^2)$ transition overhead to $O(5N)$.",
        "Because multiplying thousands of emission probabilities causes immediate floating-point underflow, the forward pass, backward pass, Baum-Welch expectation-maximisation updates, and Viterbi traceback operate entirely in log-space using a custom JIT-compiled log-sum-exp kernel (`_logsumexp_jit`).",
      ],
      bullets: [
        "Compiled core forward, backward, Baum-Welch, and Viterbi loops with Numba (`@njit(parallel=True, fastmath=True)` and `prange`), processing 50,000-sample float32 batches across CPU cores.",
        "Implemented two-pass Dynamic Time Warping (`signal_aligner.py`) parallelised via Python `multiprocessing` to map raw HG002 `.pod5` signals against GRCh38 reference truth sequences.",
        "Benchmarked decoded FASTA output against Oxford Nanopore's production Dorado basecaller using Biopython (`Bio.Align`), achieving 81% validated sequence identity.",
      ],
    },
  },
  {
    id: "dna-quality-control-toolkit",
    companyName: "DNA QC Toolkit (QCToolkit)",
    subtitle: "Multi-Threaded JavaFX & Python FASTQ Quality Control Suite",
    badge: "Multi-Threaded FASTQ Engine",
    type: "Sequencing & Bioinformatics",
    category: ["Sequencing & Bioinformatics", "Bioinformatics", "Computational Bioengineering"],
    shortDescription:
      "Engineered a multi-threaded desktop application in Java 22, JavaFX, and Python to parse high-volume .fastq and .fastq.gz sequencing reads, perform adapter and Phred trimming, and export 10 diagnostic QC charts into standalone HTML reports.",
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
    companyLogoImg: "/portfolio/projects/dna-quality-control-toolkit/cover.svg",
    pagesInfoTitle: "Interactive QC Pipeline & Report Previews",
    pagesInfoArr: [
      {
        title: "Multi-Tab Drag-and-Drop FASTQ Workspace",
        description:
          "Load multiple uncompressed (.fastq) or gzip-compressed (.fastq.gz) sequencing runs concurrently with background ExecutorService worker pools.",
        imgArr: ["/portfolio/projects/dna-quality-control-toolkit/welcome_page.png"],
      },
      {
        title: "Automated Phred & Base Composition Diagnostics",
        description:
          "Instant traffic-light pass/warn/fail grading across per-base quality, GC distribution, sequence duplication, N-content, and k-mer enrichment (validated on E. coli K-12 MG1655 SRR490124).",
        imgArr: ["/portfolio/projects/dna-quality-control-toolkit/base_statistics.png"],
      },
      {
        title: "10 Scientific Matplotlib Diagnostic Plots",
        description:
          "Bridges Java process orchestration with a Python scientific plotting backend to render high-resolution boxplots, GC curves, and k-mer profiles.",
        imgArr: ["/portfolio/projects/dna-quality-control-toolkit/data_examples.png"],
      },
      {
        title: "Adapter & Low-Quality Read Trimming",
        description:
          "Interactive sliding-window and threshold trimming module to strip adapter contamination and low-Phred 3' tails before downstream alignment.",
        imgArr: ["/portfolio/projects/dna-quality-control-toolkit/trimming.png"],
      },
      {
        title: "Interactive HTML QC Report Preview",
        description:
          "Open a live self-contained HTML report generated by QCToolkit from real sequencing reads.",
        imgArr: [],
        linkURL: "/portfolio/projects/dna-quality-control-toolkit/SRR490124_2_quality_report.html",
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Raw sequencing reads require strict quality validation before genome assembly, variant calling, or transcriptomic quantification. Inspired by FastQC, I designed and built QCToolkit as a full-lifecycle desktop bioinformatics application in Java 22 (Maven, JavaFX 24, FXML) paired with a Python scientific visualisation backend.",
        "The Java engine streams 4-line FASTQ records and `.fastq.gz` archives to compute Phred+33 quality distributions, per-tile and per-sequence quality scores, GC content, sequence length distributions, duplication levels, overrepresented sequences, and adapter contamination.",
      ],
      bullets: [
        "Decoupled heavy FASTQ parsing and read-trimming workloads from the JavaFX UI thread using `ExecutorService` thread pools and asynchronous `Task` bindings.",
        "Orchestrated 7 modular Python plotting scripts (`Matplotlib`, `NumPy`, `Pandas`, `SciPy`, `Pillow`) from Java to render 10 publication-ready QC figures.",
        "Built `HtmlReportGenerator.java` to compile summary tables, pass/warn/fail badges, and embedded base64 plots into shareable single-file HTML reports.",
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
    companyLogoImg: "/portfolio/projects/myowave/cover.svg",
    pagesInfoTitle: "End-to-End Hardware & Software Subsystems Owned",
    pagesInfoArr: [
      {
        title: "KiCad Multi-Board ADS1299 Biopotential Schematics & Arduino Due Generator",
        description:
          "Drafted multi-board KiCad schematics pairing an 8-channel 24-bit ADS1299-6PAGR front-end across +2.5V/+3.3V/+5V rails, and programmed a 12-bit DAC synthetic EHG burst generator on Arduino Due for bench verification.",
        imgArr: ["/portfolio/projects/myowave/cover.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Endometriosis takes an average of 7 to 9 years to diagnose due to invasive laparoscopy requirements. MYOWAVE is a non-invasive wearable Electrohysterography (EHG) diagnostic prototype engineered for the ENDO1000 longitudinal clinical study to capture and classify uterine myoelectrical activity.",
        "As Project Manager and Lead Electronics & Software Engineer, I led the multidisciplinary team to win Imperial College London's Year 2 Molecular Bioengineering Prize for Best Design Group Project, personally owning all electronic hardware, embedded signal synthesis, real-time digital signal processing, and full-stack software development alongside contributing to user-centric enclosure design.",
      ],
      bullets: [
        "Drafted multi-board PCB schematics in KiCad (`MYOWAVE.kicad_sch`) integrating a Texas Instruments `ADS1299-6PAGR` 24-bit biopotential ADC with Arduino Uno/Due shield interfaces, and wrote Python verification tests for bandwidth attenuation and 50 Hz common-mode rejection (`T3_CMRR.py` at 24x differential gain).",
        "Programmed Arduino Due 12-bit DAC firmware (`EHG_Generator.ino`, 115,200 baud) synthesising physiological 0.05 Hz slow-wave uterine contractions coupled with fast action-potential bursts.",
        "Engineered a threaded 250 Hz Python acquisition and DSP pipeline (`background_service.py`, `dsp_math.py`) applying 2nd-order 0.3 Hz high-pass Butterworth filtering (`scipy.signal`), RMS burst detection, and Welch power spectral density extraction across Fast Wave Low (0.34-1.0 Hz) and Fast Wave High (1.0-3.0 Hz) bands.",
        "Built dual authenticated web applications in Python (`NiceGUI` following an initial `Streamlit` prototype): a clinical researcher dashboard (port 8081) and a mobile participant diary app (port 8082) backed by interactive Plotly charts, dual Firebase Firestore cloud sync, and local SQLite persistence.",
      ],
    },
  },
  {
    id: "gene-expression-explorer",
    companyName: "Gene Expression Explorer",
    subtitle: "Interactive Differential Transcriptomics & Volcano/Heatmap Web App",
    badge: "Live Streamlit App",
    type: "Sequencing & Bioinformatics",
    category: ["Sequencing & Bioinformatics", "Bioinformatics", "Computational Bioengineering"],
    shortDescription:
      "Built and deployed an interactive Python and Streamlit differential gene expression platform supporting automated matrix detection, SciPy hypothesis testing, log2 fold-change filtering, Seaborn clustered heatmaps, and Plotly volcano plots.",
    websiteLink: "https://gene-expression-explorer.streamlit.app/",
    githubLink: "https://github.com/aahmeddev/gene-expression-explorer",
    techStack: ["Python", "Streamlit", "Pandas / NumPy / SciPy", "Git"],
    startDate: new Date("2025-08-22"),
    endDate: new Date("2025-09-27"),
    companyLogoImg: "/portfolio/projects/gene-expression-explorer/cover.svg",
    pagesInfoTitle: "Live Interactive Web Application",
    pagesInfoArr: [
      {
        title: "Launch Gene Expression Explorer on Streamlit Cloud",
        description:
          "Upload CSV/TSV/Excel/GZ expression matrices, assign case vs control cohorts, tune p-value and log2FC cutoffs, and export differentially expressed gene tables.",
        linkURL: "https://gene-expression-explorer.streamlit.app",
        imgArr: ["/portfolio/projects/gene-expression-explorer/cover.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Transcriptomic experiments from RNA-seq or microarrays output thousands of gene-level measurements across experimental cohorts. Distinguishing true biological up- or down-regulation from experimental variance requires combining magnitude thresholds ($\log_2$ fold change) with statistical significance testing ($p$-values).",
        "I built and deployed Gene Expression Explorer in Python and Streamlit to automate differential expression workflows from raw count/intensity matrices through to interactive publication figures.",
      ],
      bullets: [
        "Implemented automatic file-format and delimiter parsing across `.csv`, `.tsv`, `.txt`, `.xlsx`, and `.gz` transcriptomic datasets with regex sample-group auto-detection.",
        "Vectorised per-gene Welch/Student t-tests (`scipy.stats`) and $\log_2$ fold-change computation with configurable significance and minimum-expression filters.",
        "Paired static hierarchical clustered heatmaps (`Seaborn`, `Matplotlib`) with interactive hover-enabled volcano plots and per-gene expression boxplots (`Plotly Express`).",
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
    companyLogoImg: "/portfolio/projects/phreeqc-speciation/cover.svg",
    pagesInfoTitle: "Multi-Core Speciation Architecture",
    pagesInfoArr: [
      {
        title: "ProcessPoolExecutor Wrapper Over Native IPhreeqc DLL/SO",
        description:
          "Persistent per-worker C++ DLL initialisation across 13 thermodynamic databases (phreeqc.dat, minteq.v4.dat, wateq4f.dat, llnl.dat, pitzer.dat) eliminating repeated database I/O.",
        imgArr: ["/portfolio/projects/phreeqc-speciation/cover.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Predicting the bioavailability and toxicity of chemical and pharmaceutical species across wastewater, river catchments, and soil matrices requires solving non-linear thermodynamic equilibrium equations across tens of thousands of continuous sensor measurements.",
        "At Nanolyse Technologies Ltd., I collaborated over Git to engineer `phreeqc-python-tool` (`phreeqc_project` v0.1.0), coupling the United States Geological Survey `IPhreeqc` C++ engine with multi-core Python batch execution, MATLAB post-processing, and Microsoft Excel commercial decision models.",
      ],
      bullets: [
        "Engineered `PhreeqcBatchRunner` (`src/phreeqc/core/batch.py`) using `concurrent.futures.ProcessPoolExecutor` with a persistent worker initialiser (`_init_worker`) that loads the native `libiphreeqc.dll`/`.so` library and thermodynamic database once per CPU core.",
        "Built automated water-quality ingestion and cleaning (`clean_water_quality_file()`) handling `.xls`/`.xlsx`/`.csv` telemetry, stripping faulty sensor flags, repairing Excel serial timestamps, and retaining key electrochemical parameters (pH, temperature, nitrite, nitrate, ammonium, dissolved oxygen, conductivity).",
        "Executed high-precision parallel speciation across 35,232 dual-catchment sensor records to quantify un-ionised toxic ammonia (`NH3`, mol/kgw) dynamics, supporting executive feasibility pitches that secured a £40,000 commercial grant and 3 corporate R&D partnerships.",
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
    companyLogoImg: "/portfolio/projects/pulse-oximeter-spectrophotometer/cover.svg",
    pagesInfoTitle: "Hardware & Optical Engineering Highlights",
    pagesInfoArr: [
      {
        title: "SPI Biopotential Acquisition & Diffraction Grating Baffle Geometry",
        description:
          "Combines 8-channel ADS1299 SPI physiological waveform capture with a 900 line-pairs/mm diffraction grating optical housing featuring an asymmetrical ceiling sawtooth baffle and 45-degree specular V-trap.",
        imgArr: ["/portfolio/projects/pulse-oximeter-spectrophotometer/cover.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Reliable point-of-care diagnostics depend on low-noise analogue front-ends, deterministic embedded firmware, and mechanically isolated optical paths. Across two Imperial College London bioinstrumentation builds, I engineered both biopotential acquisition hardware and a custom transmission/fluorescence CCD spectrophotometer.",
      ],
      bullets: [
        "Full-Stack 8-Channel Pulse Oximeter (Hardware & Software Lead): Interfaced an 8-channel `ADS1299` biopotential ADC with an Arduino microcontroller over high-speed SPI using Embedded C firmware and a real-time Python physiological modelling and visualisation UI (building on an earlier Year 1 I2C Maxim `MAX30101`/`MAX32664` prototype).",
        "Custom CCD Spectrophotometer (79% Report Mark): Modelled a full optical enclosure in SolidWorks (`Ahmed_Casing.SLDASM`, `CCD_Board.SLDASM`, `TransmissionCuvetteHolder.SLDPRT`) housing ThorLabs/Newport mounts, a 900 lines/mm diffraction grating (derived 46.064 deg incidence angle at 532 nm), and an STM32 Nucleo-F401RE driving a Toshiba `TCD1304` linear CCD.",
        "Stray-Light Suppression & Spectral Calibration: Engineered an asymmetrical ceiling sawtooth baffle and a concave 45 deg zero-order V-trap to eliminate stray reflections, and wrote Python linear-regression calibration scripts (`scipy.stats.linregress`) mapping CCD pixel indices against 405 nm, 532 nm, and 650 nm laser peaks to quantify unknown dye absorbance and chlorophyll fluorescence.",
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
    companyLogoImg: "/portfolio/projects/cpp-physics-simulations/cover.svg",
    pagesInfoTitle: "Low-Latency Systems & Memory Architecture",
    pagesInfoArr: [
      {
        title: "Cache-Friendly SoA Layout & Fixed-Timestep Constraint Solver",
        description:
          "Refactored agent state from Array-of-Structures into contiguous Structure-of-Arrays buffers paired with O(1) spatial-grid neighbour lookups and std::thread worker synchronisation.",
        imgArr: ["/portfolio/projects/cpp-physics-simulations/cover.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "High-throughput scientific computing and real-time signal acquisition require careful memory layout, deterministic time-stepping, and multi-core thread synchronisation in modern C++.",
        "I built two standalone C++17 simulation engines using CMake (`FetchContent`) and statically linked SFML 3.0.0 to explore data-oriented design and numerical stability under real-time frame budgets.",
      ],
      bullets: [
        "Multi-Threaded Boid Flocking Engine (`Boid Simulation`): Refactored autonomous agent state into a cache-friendly Structure-of-Arrays (`BoidData`) memory layout, implemented $O(1)$ spatial-hash grid partitioning (`SpacialHash.cpp`) to eliminate $O(N^2)$ neighbour scans, and parallelised force evaluation across `std::thread` workers with `std::mutex` synchronisation.",
        "2D Soft-Body Physics Engine (`SoftBodyMechanics`): Implemented Verlet-style position integration with 20 iterative Hookean spring-constraint solver passes per physics tick, decoupling a deterministic `1/1600 s` fixed physics timestep from a 120 FPS rendering loop with frame-time clamping, gravity, friction, and boundary restitution.",
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
    techStack: [
      "Mammalian Cell Culture",
      "RT-PCR & Bisulphite Seq",
      "Python",
      "MATLAB",
      "Pandas / NumPy / SciPy",
    ],
    startDate: new Date("2025-10-15"),
    endDate: new Date("2026-05-15"),
    companyLogoImg: "/portfolio/projects/diabetic-wound-epigenetics/cover.svg",
    pagesInfoTitle: "Molecular & Spectroscopic Findings",
    pagesInfoArr: [
      {
        title: "CpG Promoter Hypermethylation & Quantum Dot Surface Passivation",
        description:
          "Combined wet-lab mammalian cell culture, RT-PCR, and bisulphite sequencing with Python lollipop methylation visualisations and MATLAB Arrhenius/Lineweaver-Burk kinetic modelling.",
        imgArr: ["/portfolio/projects/diabetic-wound-epigenetics/cover.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Across Imperial College London's wet-lab bioengineering modules, I combined mammalian cell culture, nucleic acid extraction, and spectroscopic characterisation with programmatic data analysis in Python and MATLAB.",
      ],
      bullets: [
        "Diabetic Wound Failure & Cellular Senescence (84.375% Report Mark): Cultured primary human dermal fibroblasts for 14 days under hyperglycaemic (~80.5 mM) vs normoglycaemic (5 mM) media; performed Qiagen RNeasy Plus RNA extraction, SuperScript IV cDNA synthesis, 35-cycle semi-quantitative RT-PCR (`COL1A1`, `MMP1`, `NOX4`, `IL6`, `GAPDH`), and 2% agarose gel electrophoresis.",
        "Epigenetic Bisulphite Sequencing (`p = 0.002`): Analysed 20 bisulphite-sequenced clones (10 control, 10 high-glucose) across 16 CpG dinucleotides in the `COL1A1` promoter using CodonCode Aligner and custom Python lollipop/bar-plot scripts, demonstrating a statistically significant methylation increase from 13.1% +/- 3.0% to 36.4% +/- 6.3% (`p = 0.002`).",
        "Nanomaterials & Analytical Spectroscopy (84% Report Mark): Synthesised CTAB-stabilised gold nanorods (modelling transverse/longitudinal plasmon modes via Gans theory) and CdSe quantum dots (where oleylamine ligand passivation halved fluorescence FWHM from 185.2 nm to 91.9 nm); elucidated aspirin structure via FTIR, 600.25 MHz 1H NMR, TLC, and melting-point assays.",
        "Enzyme Kinetics & Control Systems (MATLAB & Simulink): Quantified acid phosphatase competitive inhibition by inorganic phosphate ($K_i = 463\\,\\mu\\text{M}$, $E_a = 59.84\\,\\text{kJ mol}^{-1}$, pH 5.322 optimum) and modelled RLC s-plane stability, PID fan control, and EMG/EEG/ECG digital filters in MATLAB and Simulink.",
      ],
    },
  },
];

export const featuredExperiences = Experiences.slice(0, 6);
