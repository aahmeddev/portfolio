import { ValidPages } from "./constants";

type PagesConfig = {
  [key in ValidPages]: {
    title: string;
    description: string;
    metadata: {
      title: string;
      description: string;
    };
  };
};

export const pagesConfig: PagesConfig = {
  home: {
    title: "Home",
    description:
      "First Class MEng Molecular Bioengineering undergraduate at Imperial College London.",
    metadata: {
      title: "Home",
      description:
        "Ahmed Ahmed - MEng Molecular Bioengineering at Imperial College London. Nanopore sequencing, diagnostic bioassays, embedded instrumentation, and computational biology.",
    },
  },
  experience: {
    title: "Research & Industry Experience",
    description:
      "Diagnostic assay development, multi-core chemical speciation pipelines, clinical shadowing, and executive budget governance.",
    metadata: {
      title: "Experience",
      description:
        "Ahmed Ahmed's research, biotech industry, clinical, and leadership experience at Imperial College London, Nanolyse Technologies, NHS Blood and Transplant, and Oxford.",
    },
  },
  projects: {
    title: "Engineering & Bioinformatics Projects",
    description:
      "From-scratch nanopore basecalling, multi-threaded genomic quality control, prize-winning diagnostic hardware, and C++17 simulation engines.",
    metadata: {
      title: "Projects",
      description:
        "Ahmed Ahmed's projects in nanopore sequencing, bioinformatics, medical device hardware, wet-lab epigenetics, and C++17 scientific computing.",
    },
  },
  skills: {
    title: "Technical Capabilities",
    description:
      "Verified laboratory, computational, embedded hardware, and commercial skills built across Imperial research labs and industry R&D.",
    metadata: {
      title: "Skills",
      description:
        "Ahmed Ahmed's technical capabilities across sequencing bioinformatics, wet-lab bioanalysis, embedded bioinstrumentation, and full-stack software.",
    },
  },
  blog: {
    title: "Technical Writing",
    description:
      "Deep-dive engineering notes on nanopore signal processing, probabilistic basecalling, and molecular bioengineering.",
    metadata: {
      title: "Blog",
      description:
        "Ahmed Ahmed's technical articles on nanopore sequencing algorithms and bioengineering.",
    },
  },
  CV: {
    title: "Curriculum Vitae",
    description:
      "Verified Imperial College London academic transcript record, research history, and downloadable 1-page PDF CV.",
    metadata: {
      title: "CV",
      description:
        "Ahmed Ahmed's Curriculum Vitae, official Imperial College London module marks, and downloadable PDF.",
    },
  },
  contact: {
    title: "Contact",
    description:
      "Connect regarding biotech R&D, computational biology, nanopore sequencing, and 2027 placement opportunities.",
    metadata: {
      title: "Contact",
      description: "Contact Ahmed Ahmed for biotech, bioinformatics, and R&D roles.",
    },
  },
};
