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
    title: "AutoGen: Building the Future",
    blogDescription:
      "Improved the gallery component to showcase the community work. This involved restructuring the component architecture and implementing responsive design patterns.",
    date: "10/09/2025",
    link: "blog/autogen-building-future",
    slug: "autogen-building-future",
    tags: ["React", "Gallery", "Community"]
  },
  {
    title: "Creative Commons Navbar Fix",
    blogDescription:
      "Closed Issue: Fixed navbar issue on the main website of creative common.",
    date: "15/08/2025",
    link: "blog/creative-commons-navbar-fix",
    slug: "creative-commons-navbar-fix",
    tags: ["Open Source", "Bug Fix", "CSS"]
  }
];

export const featuredBlogs: blogInterface[] = blogsUnsorted.slice(0, 5);
