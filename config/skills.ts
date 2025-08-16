import { Icons } from "@/components/common/icons";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  icon: any;
}

export const skillsUnsorted: skillsInterface[] = [
  {
    name: "Python",
    description: "Versatile language for scripting, data analysis, and building bioinformatics pipelines.",
    rating: 5,
    icon: Icons.python, 
  },
  {
    name: "MATLAB", 
    description: "High-level language and interactive environment for numerical computation, visualization, and programming.",
    rating: 5,
    icon: Icons.matlab, 
  },
  {
    name: "Java",
    description: "General-purpose, object-oriented language for building robust, large-scale applications.",
    rating: 5,
    icon: Icons.java,
  },
  {
    name: "HTML5", 
    description: "The standard markup language for creating the structure and content of web pages.",
    rating: 4,
    icon: Icons.html5, 
  },
  {
    name: "Git", 
    description: "Essential version control system for tracking code changes and collaborating on software projects.",
    rating: 5,
    icon: Icons.git, 
  },
  {
    name: "Pytorch", 
    description: "A popular open-source machine learning library for building and training neural networks.",
    rating: 4,
    icon: Icons.pytorch, 
  },
  {
    name: "ImageJ",
    description: "Open-source image processing program widely used for analyzing scientific and medical images.",
    rating: 5,
    icon: Icons.imagej,
  },
  {
    name: "Biopython", 
    description: "The go-to library and toolkit for computational molecular biology and bioinformatics in Python.",
    rating: 4,
    icon: Icons.python, 
  },
  {
    name: "C++", 
    description: "A high-performance language used for systems programming, game development, and computational science.",
    rating: 4,
    icon: Icons.cpp, 
  },
];

export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 6);
