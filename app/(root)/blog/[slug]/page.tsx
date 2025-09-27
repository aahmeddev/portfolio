import Link from "next/link";
import { notFound } from "next/navigation";
import { promises as fs } from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'; // Add this import
import { blogsUnsorted } from "@/config/blogs";
import PageContainer from "@/components/common/page-container";
import BlogImage from "@/components/blogs/blog-image";

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
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.blogDescription,
  };
}

async function getBlogContent(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.md`);
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading blog content:', error);
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link
            href="/blog"
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>←</span>
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      <PageContainer
        title={blog.title}
        description={blog.blogDescription}
      >
        <header className="mb-8 space-y-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>📅</span>
              <time>{blog.date}</time>
            </div>
            {blog.tags && (
              <div className="flex items-center space-x-2">
                <span>#</span>
                <div className="flex space-x-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-muted rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Blog Content */}
        <article className="max-w-none">
          <div className="markdown-content space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]} // Add this to parse raw HTML
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 mt-8 text-foreground clear-both">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3 mt-6 text-foreground clear-both">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-medium mb-2 mt-4 text-foreground clear-both">{children}</h3>,
                p: ({ children }) => <p className="mb-4 leading-relaxed text-foreground">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 ml-4">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">{children}</ol>,
                li: ({ children }) => <li className="text-foreground">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                em: ({ children }) => <em className="italic text-foreground">{children}</em>,
                code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-sm">{children}</code>,
                pre: ({ children }) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 clear-both">{children}</pre>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-muted-foreground pl-4 italic my-4 clear-both">{children}</blockquote>,

                // Handle divs (for clearfix)
                div: ({ className, children, ...props }) => {
                  if (className === 'clearfix') {
                    return <div className="clear-both h-0" />;
                  }
                  return <div className={className} {...props}>{children}</div>;
                },

                // Custom image handling
                img: ({ src, alt, title }) => {
                  if (!src) return null;

                  let customProps = {};
                  if (title) {
                    try {
                      if (title.startsWith('{') && title.endsWith('}')) {
                        customProps = JSON.parse(title);
                      } else {
                        customProps = { caption: title };
                      }
                    } catch (error) {
                      console.error('JSON parse error:', error);
                      customProps = { caption: title };
                    }
                  }

                  const validSizes = ['small', 'medium', 'large', 'full'] as const;
                  type ValidSize = typeof validSizes[number];

                  const finalProps = {
                    size: 'large',
                    align: 'center',
                    wrap: false,
                    rounded: true,
                    shadow: true,
                    ...customProps
                  };

                  return (
                    <BlogImage
                      src={src}
                      alt={alt || ''}
                      {...finalProps as any}
                    />
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </article>

        <footer className="mt-12 pt-8 border-t clear-both">
          <div className="flex justify-between items-center">
            <Link
              href="/portfolio/blog"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>←</span>
              <span>All Posts</span>
            </Link>
          </div>
        </footer>
      </PageContainer>
    </div>
  );
}
