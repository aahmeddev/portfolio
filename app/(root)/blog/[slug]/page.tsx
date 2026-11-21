import Link from "next/link";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { blogsUnsorted } from "@/config/blogs";
import BlogImage from "@/components/blogs/blog-image";
import { Icons } from "@/components/common/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  return (
    <article className="mx-auto max-w-4xl py-4 sm:py-6 lg:py-8">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-4 inline-flex text-muted-foreground hover:text-foreground"
        )}
      >
        <Icons.chevronLeft className="mr-1.5 h-4 w-4" />
        Back to Articles &amp; Reports
      </Link>

      <header className="mb-8 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-muted-foreground mb-3">
          {blog.category && (
            <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary border border-primary/25">
              {blog.category}
            </span>
          )}
          <time>{blog.date}</time>
          {blog.readTime && (
            <>
              <span>•</span>
              <span>{blog.readTime}</span>
            </>
          )}
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl leading-tight text-foreground">
          {blog.title}
        </h1>

        <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
          {blog.blogDescription}
        </p>

        {blog.tags && (
          <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-medium bg-muted text-foreground rounded-md border border-border/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="markdown-content space-y-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-4 mt-8 text-foreground clear-both">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3 mt-8 pt-4 border-t border-border/60 first:border-t-0 first:pt-0 first:mt-0 text-foreground clear-both">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-heading text-lg sm:text-xl font-medium mb-2 mt-6 text-foreground clear-both">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed text-sm sm:text-base text-foreground/90">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-4 space-y-2 text-sm sm:text-base text-foreground/90">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-4 space-y-2 text-sm sm:text-base text-foreground/90">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-foreground">{children}</em>
              ),
              code: ({ children }) => (
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-muted p-4 rounded-xl overflow-x-auto mb-5 text-xs sm:text-sm border border-border clear-both">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary/50 pl-4 italic my-4 text-muted-foreground clear-both">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="my-6 w-full overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-muted/70 text-foreground border-b border-border">
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="py-3 px-4 font-semibold">{children}</th>
              ),
              td: ({ children }) => (
                <td className="py-3 px-4 border-t border-border/60 align-top">
                  {children}
                </td>
              ),
              div: ({ className, children, ...props }) => {
                if (className === "clearfix") {
                  return <div className="clear-both h-0" />;
                }
                return (
                  <div className={className} {...props}>
                    {children}
                  </div>
                );
              },
              img: ({ src, alt, title }) => {
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
                  rounded: true,
                  shadow: true,
                  ...customProps,
                };

                return (
                  <BlogImage
                    src={src}
                    alt={alt || ""}
                    {...(finalProps as any)}
                  />
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      <footer className="mt-8 pt-6 border-t border-border flex justify-between items-center">
        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          All Articles &amp; Reports
        </Link>
      </footer>
    </article>
  );
}
