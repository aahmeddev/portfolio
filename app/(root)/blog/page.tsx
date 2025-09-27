import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import BlogCard from "@/components/blogs/blog-card";
import { blogsUnsorted } from "@/config/blogs";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.blog.metadata.title,
  description: pagesConfig.blog.metadata.description,
};

export default function BlogPage() {
  return (
    <PageContainer
      title={pagesConfig.blog.title}
      description={pagesConfig.blog.description}
    >
      <BlogCard blogs={blogsUnsorted} />
    </PageContainer>
  );
}

