// config/blogs.ts
export interface blogInterface {
  title: string;
  blogDescription: string;
  date: string;
  link: string;
  slug: string;
  tags?: string[];
}

export const blogsUnsorted: blogInterface[] = [
  {
    title: "Exploring Oxford Nanopore's Basecalling Algorithms",
    blogDescription:
      "A hands-on, technical journey exploring how raw electrical signals become DNA sequences using open source data & algorithms— showcasing practical coding, data analysis, and exploring real-time genomics.",
    date: "15/08/2025",
    link: "blog/nanopore-basecalling",
    slug: "nanopore-basecalling",
    tags: ["Python", "Bioinformatics", "Nanopore-Sequencing"]
  }
];

export const featuredBlogs: blogInterface[] = blogsUnsorted.slice(0, 5);