import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { blogInterface } from "@/config/blogs";
import { cn } from "@/lib/utils";

interface ContributionCardProps {
  blogs: blogInterface[];
  singleRowOnDesktop?: boolean;
}

export default function BlogCard({
  blogs,
  singleRowOnDesktop = false,
}: ContributionCardProps) {
  return (
    <div
      className={cn(
        "mx-auto grid gap-6 static",
        singleRowOnDesktop
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:[&>*:nth-child(3)]:hidden lg:[&>*:nth-child(3)]:block"
          : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      )}
    >
      {blogs.map((blog, id) => {
        const href = blog.link.startsWith("/") ? blog.link : `/${blog.link}`;
        const isPhoto = blog.coverImage?.endsWith(".jpg");
        return (
          <Link href={href} key={id} className="group block h-full">
            <article
              className={cn(
                "flex flex-col justify-between h-full bg-card oxblood-plate p-5 rounded-sm",
                id % 3 === 0 ? "tilt-neg" : id % 3 === 1 ? "tilt-pos" : "tilt-soft"
              )}
            >
              <div>
                {blog.coverImage && (
                  <div className="relative w-full aspect-[16/10] mb-4 overflow-hidden border border-border/80 bg-[#120e10]">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className={cn(
                        "group-hover:scale-[1.02] transition-transform duration-300",
                        isPhoto
                          ? "object-cover"
                          : "object-contain p-2 bg-[#120e10]"
                      )}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {blog.category && (
                      <span className="absolute top-2.5 left-2.5 bg-background/95 px-2.5 py-1 text-[11px] font-mono font-semibold text-primary border border-primary/40">
                        {blog.category}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2.5 text-xs font-mono text-muted-foreground mb-2">
                  <time>{blog.date}</time>
                  {blog.readTime && (
                    <>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </>
                  )}
                </div>

                <h3 className="font-heading text-lg sm:text-xl leading-snug text-foreground group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>

                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {blog.blogDescription}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags?.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center text-xs font-mono font-semibold text-primary shrink-0 group-hover:translate-x-0.5 transition-transform">
                  Read Story
                  <Icons.chevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
