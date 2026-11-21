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
      "Molecular Bioengineering at Imperial College London.",
    metadata: {
      title: "Home",
      description:
        "Ahmed Ahmed - Molecular Bioengineering at Imperial College London. Projects and research across nanopore sequencing, diagnostic bioassays, bioinstrumentation, and scientific software.",
    },
  },
  experience: {
    title: "Research & Industry Experience",
    description:
      "Laboratory research, scientific software engineering, clinical shadowing, and departmental leadership.",
    metadata: {
      title: "Experience",
      description:
        "Ahmed Ahmed's research, biotech industry, clinical, and leadership experience at Imperial College London, Nanolyse Technologies, NHS Blood and Transplant, and Oxford.",
    },
  },
  projects: {
    title: "Engineering & Bioinformatics Projects",
    description:
      "Software tools, hardware prototypes, and experimental analyses built across sequencing, diagnostics, and bioinstrumentation.",
    metadata: {
      title: "Projects",
      description:
        "Ahmed Ahmed's projects in nanopore sequencing, bioinformatics, medical device hardware, wet-lab epigenetics, and C++17 scientific computing.",
    },
  },
  skills: {
    title: "Technical Capabilities",
    description:
      "Laboratory techniques, programming languages, embedded instrumentation, and analytical tools used across my research and engineering work.",
    metadata: {
      title: "Skills",
      description:
        "Ahmed Ahmed's technical capabilities across sequencing bioinformatics, wet-lab bioanalysis, embedded bioinstrumentation, and full-stack software.",
    },
  },
  blog: {
    title: "Technical Articles & Lab Reports",
    description:
      "Illustrated engineering writeups and laboratory research reports covering nanopore basecalling, optical CAD, epigenetics, nanomaterials, and biosignal processing.",
    metadata: {
      title: "Articles & Reports",
      description:
        "Ahmed Ahmed's technical articles and research reports on nanopore sequencing algorithms, spectrophotometry, epigenetics, and bioengineering.",
    },
  },
  CV: {
    title: "Curriculum Vitae",
    description:
      "Academic record, research timeline, and downloadable 1-page PDF curriculum vitae.",
    metadata: {
      title: "CV",
      description:
        "Ahmed Ahmed's Curriculum Vitae, Imperial College London academic transcript, and downloadable PDF.",
    },
  },
  contact: {
    title: "Contact",
    description:
      "Get in touch regarding research collaborations, biotech R&D, or placement opportunities.",
    metadata: {
      title: "Contact",
      description: "Contact Ahmed Ahmed for biotech, bioinformatics, and R&D roles.",
    },
  },
};
