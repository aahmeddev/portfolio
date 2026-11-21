// config/blogs.ts
export interface blogInterface {
  title: string;
  blogDescription: string;
  date: string;
  link: string;
  slug: string;
  tags?: string[];
  coverImage?: string;
  category?: string;
  readTime?: string;
}

export const blogsUnsorted: blogInterface[] = [
  {
    title: "Decoding Raw Nanopore POD5 Signals with a 1,025-State Numba Hidden Markov Model",
    blogDescription:
      "From holding a MinION sequencer at an Imperial talk to coding a 1,025-state log-space Numba HMM basecaller from scratch: how we aligned 4 kHz POD5 reads to chromosome 22, reached 81% identity vs Dorado, and where Markov models hit the homopolymer wall.",
    date: "15/08/2025",
    link: "blog/nanopore-basecalling",
    slug: "nanopore-basecalling",
    category: "Sequencing & Algorithms",
    readTime: "12 min read",
    coverImage: "/portfolio/blogs/nanopore-basecalling/minion.jpg",
    tags: ["Python", "Numba JIT", "Hidden Markov Models", "POD5", "Oxford Nanopore"],
  },
  {
    title: "Seeing Quantum Mechanics in a Vial: Gold Nanorods, Zeldovich Nucleation & CdSe Quantum Dots",
    blogDescription:
      "Inside the darkroom and at the keyboard: synthesising CTAB gold nanorods and size-tunable CdSe quantum dots, coding Gans dipole theory and Zeldovich burst nucleation in Python, and halving deep-trap fluorescence FWHM (185.2 nm to 91.9 nm) with oleylamine.",
    date: "18/02/2026",
    link: "blog/nanorods-and-quantum-dots",
    slug: "nanorods-and-quantum-dots",
    category: "Nanomaterials & Physical Chemistry",
    readTime: "10 min read",
    coverImage: "/portfolio/blogs/nanorods-qds/quantum_dots_uv_photo.jpg",
    tags: ["Quantum Dots", "Gold Nanorods", "Gans Theory", "Nucleation", "Python"],
  },
  {
    title: "Designing, 3D-Printing, and Calibrating a Custom Linear CCD Spectrophotometer",
    blogDescription:
      "Why our first 3D-printed optical housing suffered from zero-order and ceiling glare, how we engineered an asymmetrical sawtooth baffle and 45-degree V-trap in SolidWorks, and calibrating 3,648 Toshiba TCD1304 CCD pixels with three lasers.",
    date: "22/03/2026",
    link: "blog/custom-ccd-spectrophotometer",
    slug: "custom-ccd-spectrophotometer",
    category: "Optical Bioinstrumentation & CAD",
    readTime: "9 min read",
    coverImage: "/portfolio/projects/pulse-oximeter-spectrophotometer/cad_isometric.png",
    tags: ["SolidWorks CAD", "STM32", "TCD1304 CCD", "Optics", "Python"],
  },
  {
    title: "Engineering MYOWAVE: Non-Invasive Uterine Biopotentials to Close the Endometriosis Diagnostic Gap",
    blogDescription:
      "Our journey to winning the Departmental Best Design Project Prize: designing a 24-bit ADS1299 KiCad PCB for 50-microvolt uterine signals, building an Arduino Due synthetic uterus DAC, and migrating our 250 Hz DSP clinical portals from Streamlit to NiceGUI.",
    date: "02/05/2026",
    link: "blog/myowave-ehg-diagnostics",
    slug: "myowave-ehg-diagnostics",
    category: "Medtech Hardware & Full-Stack DSP",
    readTime: "10 min read",
    coverImage: "/portfolio/projects/myowave-ehg/pcb_angled_3d.png",
    tags: ["KiCad PCB", "ADS1299", "SciPy DSP", "NiceGUI", "Arduino Due"],
  },
  {
    title: "The Puzzle of Metabolic Memory: Epigenetic Promoter Hypermethylation in Diabetic Wounds",
    blogDescription:
      "Why diabetic ulcers fail to heal even after glucose normalises: 14 days of primary dermal fibroblast culture, RNase-free RT-PCR across COL1A1/MMP1/NOX4/IL6, and cloning 20 bisulphite-sequenced alleles to prove a 2.8x jump in COL1A1 CpG methylation (p = 0.002).",
    date: "14/05/2026",
    link: "blog/diabetic-wound-epigenetics",
    slug: "diabetic-wound-epigenetics",
    category: "Molecular & Cellular Bioengineering",
    readTime: "9 min read",
    coverImage: "/portfolio/blogs/diabetic-wound-epigenetics/fibroblasts_microscopy_photo.jpg",
    tags: ["Bisulphite Sequencing", "RT-PCR", "Epigenetics", "Cell Culture", "Python"],
  },
  {
    title: "Why Biopotentials Are So Hard to Clean Up: sEMG Conduction Velocity, EEG Alpha & Z-Plane ECG Filters",
    blogDescription:
      "Breaking through integer-sample delay quantization to track 4.1 m/s muscle action potentials, measuring the 45 ms electromechanical delay between EMG and torque, taming EEG periodogram variance with Welch windows, and placing Z-plane poles and zeros by hand.",
    date: "10/01/2026",
    link: "blog/digital-biosignal-processing",
    slug: "digital-biosignal-processing",
    category: "Biomedical Signal Processing",
    readTime: "11 min read",
    coverImage: "/portfolio/blogs/digital-biosignals/biosignal_oscilloscope_photo.jpg",
    tags: ["MATLAB", "Digital Signal Processing", "EMG / EEG / ECG", "Welch PSD", "Z-Transform"],
  },
  {
    title: "Proving What Is in Your Flask: 600 MHz 1H NMR, Enzyme Inhibition Kinetics & Biological Bifurcations",
    blogDescription:
      "Verifying aspirin esterification across 600.25 MHz 1H NMR spin-spin multiplets and ATR-FTIR, catching competitive product inhibition in acid phosphatase (Ki = 463 uM, Ea = 59.84 kJ/mol), red blood cell Fragiligraphs, and saddle-node hysteresis memory.",
    date: "05/12/2025",
    link: "blog/analytical-spectroscopy-and-kinetics",
    slug: "analytical-spectroscopy-and-kinetics",
    category: "Analytical Chemistry & Mathematical Biology",
    readTime: "10 min read",
    coverImage: "/portfolio/blogs/analytical-kinetics/nmr_spectrometer_photo.jpg",
    tags: ["600 MHz NMR", "FTIR", "Enzyme Kinetics", "ODE Bifurcations", "MATLAB"],
  },
];

export const featuredBlogs: blogInterface[] = blogsUnsorted.slice(0, 3);
