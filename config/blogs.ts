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
      "A ground-up walkthrough of nanopore signal basecalling: five-stage POD5 current conditioning, two-pass multiprocessing DTW reference alignment on chromosome 22, log-space Numba forward-backward kernels, and benchmarking against Oxford Nanopore Dorado.",
    date: "15/08/2025",
    link: "blog/nanopore-basecalling",
    slug: "nanopore-basecalling",
    category: "Sequencing & Algorithms",
    readTime: "12 min read",
    coverImage: "/portfolio/projects/nanopore-hmm-basecaller/hmm_viterbi_overview.png",
    tags: ["Python", "Numba JIT", "Hidden Markov Models", "POD5", "Oxford Nanopore"],
  },
  {
    title: "Epigenetic Promoter Hypermethylation and Senescence in Diabetic Wound Failure",
    blogDescription:
      "Investigating how chronic hyperglycaemia (80.5 mM glucose) drives COL1A1 promoter CpG hypermethylation (13.1% to 36.4%, p = 0.002) and MMP1/NOX4/IL6 transcriptional remodelling in primary human dermal fibroblasts via bisulphite sequencing and 35-cycle RT-PCR.",
    date: "14/05/2026",
    link: "blog/diabetic-wound-epigenetics",
    slug: "diabetic-wound-epigenetics",
    category: "Molecular & Cellular Bioengineering",
    readTime: "8 min read",
    coverImage: "/portfolio/projects/diabetic-wound-epigenetics/cpg_methylation_summary.png",
    tags: ["Bisulphite Sequencing", "RT-PCR", "Epigenetics", "Cell Culture", "Python"],
  },
  {
    title: "Engineering MYOWAVE: Non-Invasive Electrohysterography Hardware & 250 Hz DSP",
    blogDescription:
      "How we built our prize-winning wearable uterine biopotential platform for the ENDO1000 endometriosis study: custom KiCad ADS1299 24-bit PCB design, Arduino Due 12-bit DAC burst synthesis, zero-phase Butterworth/Welch DSP, and dual NiceGUI clinical portals.",
    date: "02/05/2026",
    link: "blog/myowave-ehg-diagnostics",
    slug: "myowave-ehg-diagnostics",
    category: "Bioinstrumentation & Medtech",
    readTime: "9 min read",
    coverImage: "/portfolio/projects/myowave-ehg/pcb_angled_3d.png",
    tags: ["KiCad PCB", "ADS1299", "SciPy DSP", "NiceGUI", "Arduino Due"],
  },
  {
    title: "Designing and Calibrating a Custom 3D-Printed Linear CCD Spectrophotometer",
    blogDescription:
      "Optical grating angle derivation (46.064 deg at 532 nm), SolidWorks asymmetrical sawtooth ceiling baffles and 45-degree specular V-traps, STM32 + Toshiba TCD1304 linear CCD readout, and three-laser wavelength regression for absorbance and fluorescence spectroscopy.",
    date: "22/03/2026",
    link: "blog/custom-ccd-spectrophotometer",
    slug: "custom-ccd-spectrophotometer",
    category: "Optical Bioinstrumentation",
    readTime: "8 min read",
    coverImage: "/portfolio/projects/pulse-oximeter-spectrophotometer/cad_improvements_breakdown.png",
    tags: ["SolidWorks CAD", "STM32", "TCD1304 CCD", "Optics", "Python"],
  },
  {
    title: "Plasmonic Gold Nanorods, Zeldovich Nucleation, and CdSe Quantum Dot Passivation",
    blogDescription:
      "Modelling transverse and longitudinal Surface Plasmon Resonance modes via Gans electrodynamic dipole theory, non-equilibrium Zeldovich burst nucleation kinetics, and oleylamine surface trap passivation halving CdSe quantum dot emission FWHM from 185.2 nm to 91.9 nm.",
    date: "18/02/2026",
    link: "blog/nanorods-and-quantum-dots",
    slug: "nanorods-and-quantum-dots",
    category: "Nanomaterials & Spectroscopy",
    readTime: "9 min read",
    coverImage: "/portfolio/projects/diabetic-wound-epigenetics/nanorod_qd_absorbance.png",
    tags: ["Nanomaterials", "Quantum Dots", "Gans Theory", "UV-Vis / Fluorescence", "Python"],
  },
  {
    title: "Digital Biosignal Processing: sEMG Conduction Velocity, EEG Alpha PSD & Z-Plane ECG Filtering",
    blogDescription:
      "Extracting physiological biomarkers from noisy clinical recordings: subsample MSE delay estimation for muscle fibre conduction velocity, isometric torque envelope tracking, Welch periodograms of occipital EEG Alpha blocking, and Z-plane pole-zero IIR ECG notch filters.",
    date: "10/01/2026",
    link: "blog/digital-biosignal-processing",
    slug: "digital-biosignal-processing",
    category: "Signal Processing",
    readTime: "10 min read",
    coverImage: "/portfolio/blogs/digital-biosignals/emg_delay_combined.png",
    tags: ["MATLAB", "Digital Signal Processing", "EMG / EEG / ECG", "Welch PSD", "Z-Transform"],
  },
  {
    title: "600 MHz 1H NMR & ATR-FTIR Structural Elucidation, Enzyme Kinetics & Biological Bifurcations",
    blogDescription:
      "Orthogonal spectroscopic verification of acetylsalicylic acid via 600.25 MHz 1H NMR and ATR-FTIR, Lineweaver-Burk competitive inhibition (Ki = 463 uM) and Arrhenius activation energy (Ea = 59.84 kJ/mol), erythrocyte Fragiligraph curves, and saddle-node ODE hysteresis.",
    date: "05/12/2025",
    link: "blog/analytical-spectroscopy-and-kinetics",
    slug: "analytical-spectroscopy-and-kinetics",
    category: "Analytical Chemistry & Mathematical Biology",
    readTime: "9 min read",
    coverImage: "/portfolio/blogs/analytical-kinetics/enzyme_kinetics_arrhenius.png",
    tags: ["600 MHz NMR", "FTIR", "Enzyme Kinetics", "ODE Bifurcations", "MATLAB"],
  },
];

export const featuredBlogs: blogInterface[] = blogsUnsorted.slice(0, 4);
