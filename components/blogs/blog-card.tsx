import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { blogInterface } from "@/config/blogs";

interface ContributionCardProps {
  blogs: blogInterface[];
}

export default function BlogCard({
  blogs,
}: ContributionCardProps) {
  return (
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-2 static">
      {blogs.map((blog, id) => (
        <Link href={blog.link} key={id}>
          <div className="relative rounded-lg border bg-background p-2 hover:bg-accent hover:text-accent-foreground">
            <Icons.externalLink
              size={35}
              className="absolute bottom-3 right-3 border bg-background rounded-full p-2 cursor-pointer text-muted-foreground "
            />
            <div className="flex h-[170px] flex-col justify-between rounded-md p-6 sm:h-[170px]">
              {/* Title section - top left */}
              <div className="flex flex-row justify-between">
                <h3 className="font-bold flex space-x-2 items-center">
                  <Icons.gitRepoIcon size={20} />
                  <span>{blog.title}</span>
                </h3>
                <Icons.gitBranch size={20} />
              </div>

              {/* Spacer and description container */}
              <div className="flex-1 flex items-center">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {blog.blogDescription}
                </p>
              </div>

              {/* Date section - bottom left */}
              <p className="text-sm text-muted-foreground flex space-x-2 items-center">
                <Icons.gitOrgBuilding size={15} />
                <span>{blog.date}</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
