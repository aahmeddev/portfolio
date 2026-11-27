import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { blogsUnsorted } from "@/config/blogs";
import BlogImage from "@/components/blogs/blog-image";
import { Icons } from "@/components/common/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogsUnsorted.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const blog = blogsUnsorted.find((blog) => blog.slug === params.slug);

  if (!blog) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.blogDescription,
  };
}

async function getBlogContent(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "content", "blogs", `${slug}.md`);
    const content = await fs.readFile(filePath, "utf8");
    return content;
  } catch (error) {
    console.error("Error reading blog content:", error);
    return null;
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = blogsUnsorted.find((blog) => blog.slug === params.slug);

  if (!blog) {
    notFound();
  }

  const content = await getBlogContent(params.slug);

  if (!content) {
    notFound();
  }

  const rawChunks = content
    .split(/\n(?=##\s+)/)
    .map((c) => c.trim())
    .filter(Boolean);

  const markdownComponents = {
    h1: ({ children }: any) => (
      <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-4 mt-6 text-foreground clear-both">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3.5 mt-4 pb-2 border-b border-primary/25 text-foreground clear-both">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-heading text-lg sm:text-xl font-medium mb-2.5 mt-6 text-foreground clear-both">
        {children}
      </h3>
    ),
    p: ({ children }: any) => (
      <p className="mb-4 leading-[1.78] text-base text-foreground/90">
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-foreground/90 leading-[1.72]">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-base text-foreground/90 leading-[1.72]">
        {children}
      </ol>
    ),
    li: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }: any) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-foreground">{children}</em>
    ),
    code: ({ className, children, ...props }: any) => {
      const isBlock = className && className.includes("language-");
      if (isBlock) {
        return (
          <code className={cn("font-mono text-xs sm:text-sm", className)} {...props}>
            {children}
          </code>
        );
      }
      return (
        <code className="bg-muted px-1.5 py-0.5 text-xs sm:text-sm font-mono">
          {children}
        </code>
      );
    },
    pre: ({ children }: any) => (
      <pre className="bg-background p-4 overflow-x-auto mb-5 text-xs sm:text-sm border border-primary/30 clear-both">
        {children}
      </pre>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent pl-4 italic my-5 text-muted-foreground clear-both">
        {children}
      </blockquote>
    ),
    table: ({ children }: any) => (
      <div className="my-5 w-full overflow-x-auto border border-primary/30 bg-background">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-muted/70 text-foreground border-b border-primary/30">
        {children}
      </thead>
    ),
    th: ({ children }: any) => (
      <th className="py-2.5 px-3.5 font-mono font-semibold text-primary">{children}</th>
    ),
    td: ({ children }: any) => (
      <td className="py-2.5 px-3.5 border-t border-border/60 align-top">
        {children}
      </td>
    ),
    div: ({ className, children, ...props }: any) => {
      if (className === "clearfix") {
        return <div className="clear-both h-0" />;
      }
      return (
        <div className={className} {...props}>
          {children}
        </div>
      );
    },
    img: ({ src, alt, title }: any) => {
      if (!src) return null;
      let customProps = {};
      if (title) {
        try {
          if (title.startsWith("{") && title.endsWith("}")) {
            customProps = JSON.parse(title);
          } else {
            customProps = { caption: title };
          }
        } catch {
          customProps = { caption: title };
        }
      }
      const finalProps = {
        size: "large",
        align: "center",
        wrap: false,
        rounded: false,
        shadow: true,
        ...customProps,
      };
      return <BlogImage src={src} alt={alt || ""} {...(finalProps as any)} />;
    },
  };

  const renderedSheets = rawChunks.map((chunk, idx) => {
    const match = chunk.match(/^##\s+(.+)$/m);
    const title = match ? match[1].trim() : idx === 0 ? "Overview" : `Section ${idx + 1}`;
    return {
      title,
      node: (
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={markdownComponents}
        >
          {chunk}
        </ReactMarkdown>
      ),
    };
  });

  return (
    <article className="mx-auto max-w-4xl py-2">
      <div className="flex items-center justify-between gap-2 mb-4">
        <Link
          href="/blog"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "inline-flex font-mono text-xs text-muted-foreground hover:text-primary"
          )}
        >
          <Icons.chevronLeft className="mr-1.5 h-4 w-4" />
          Back to 03 · Lab Blogs
        </Link>
        <span className="font-mono text-[11px] text-primary">
          {blog.date} · {blog.readTime}
        </span>
      </div>

      {/* COMPACT EDITORIAL HEADER */}
      <header className="mb-6 space-y-3 border-b border-primary/30 pb-5">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl leading-[1.14] tracking-tight text-foreground">
          {blog.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {blog.blogDescription}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center space-x-2.5">
            <Image
              src={profileImg}
              alt="Ahmed Ahmed"
              width={32}
              height={32}
              className="border border-primary/40 object-cover"
            />
            <span className="font-mono text-xs text-foreground">
              {siteConfig.authorName} · Imperial Bioengineering
            </span>
          </div>
          {blog.tags && (
            <div className="flex flex-wrap gap-1.5">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-[10.5px] font-mono bg-background text-muted-foreground border border-primary/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* CONTINUOUS EDITORIAL ARTICLE BODY */}
      <div className="markdown-content space-y-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </div>

      <footer className="mt-8 pt-5 border-t border-primary/25 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "font-mono text-xs")}
        >
          <Icons.chevronLeft className="mr-1.5 h-4 w-4" />
          All Lab Blogs
        </Link>
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "font-mono text-xs")}
        >
          02 · Projects
          <Icons.chevronRight className="ml-1.5 h-4 w-4" />
        </Link>
      </footer>
    </article>
  );
}
