import { ValidPages } from "./constants";

type PagesConfig = {
  [key in ValidPages]: {
    title: string;
    description: string;
    metadata: {
      title: string;
      description: string;
    };
    // featuredDescription: string;
  };
};

export const pagesConfig: PagesConfig = {
  home: {
    title: "Home",
    description: "Welcome to my portfolio website.",
    metadata: {
      title: "Home",
      description: "Ahmed Ahmed's portfolio website.",
    },
  },
  skills: {
    title: "Skills",
    description: "Key skills that define my professional identity.",
    metadata: {
      title: "Skills",
      description:
        "Ahmed Ahmed's key skills.",
    },
  },
  projects: {
    title: "Projects",
    description: "A showcase of my computational biology and software development projects.",
    metadata: {
      title: "Projects",
      description: "Ahmed Ahmed's projects in bioinformatics and molecular bioengineering.",
    },
  },
  contact: {
    title: "Contact",
    description: "Let's connect and explore collaborations.",
    metadata: {
      title: "Contact",
      description: "Contact Ahmed Ahmed.",
    },
  },
  blog: { 
    title: "Blog",
    description: "Writings and thoughts on molecular bioengineering and technology.",
    metadata: {
      title: "Blog",
      description: "Ahmed Ahmed's blog on science and technology.",
    },
  },
  resume: {
    title: "Resume",
    description: "Ahmed Ahmed's resume.",
    metadata: {
      title: "Resume",
      description: "Ahmed Ahmed's resume.",
    },
  },
  career: {
    title: "Career Timeline",
    description: "Professional journey and experience timeline.",
    metadata: {
      title: "Career Timeline",
      description: "Ahmed Ahmed's professional journey and career timeline.",
    },
  },
};
