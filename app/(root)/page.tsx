import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { AnimatedSection } from "@/components/common/animated-section";
import { AnimatedText } from "@/components/common/animated-text";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import ContributionCard from "@/components/blogs/blog-card";
import ProjectCard from "@/components/experience/project-card";
import SkillsCard from "@/components/skills/skills-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { featuredBlogs } from "@/config/blogs";
import { featuredExperiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { featuredSkills } from "@/config/skills";
import { cn } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";
import BlogCard from "@/components/blogs/blog-card";

export const metadata: Metadata = {
  title: `${pagesConfig.home.metadata.title}`,
  description: `${pagesConfig.home.metadata.description}`,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function IndexPage() {
  // Structured data for personal portfolio
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: "Molecular Bioengineering Undergraduate Student",
    sameAs: [siteConfig.links.github, siteConfig.links.twitter],
  };

  // Structured data for website as a software application (template)
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ahmed Portfolio",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
  };

  return (
    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="schema-software"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* HERO SECTION: Everything fits, responsive, clean */}
      <section className="w-full flex justify-center items-center bg-background">
        <div className="
            w-full
            max-w-2xl
            flex flex-col items-center px-4
            pb-8
            space-y-5
          ">
          <div className="mb-0">
            <Image
              src={profileImg}
              alt="Ahmed Ahmed Portfolio"
              width={320}
              height={320}
              priority
              className="
                rounded-full
                object-cover object-center
                border-8 border-primary
                shadow-lg
                w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72
                mx-auto
              "
            />
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-extrabold">
            Ahmed Ahmed
          </h1>
          <h2 className="font-heading text-center text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold mb-2">
            Molecular Bioengineering Undergraduate Student
          </h2>
          <p className="text-base sm:text-lg font-medium text-muted-foreground text-center">
            Welcome to my portfolio website!
          </p>
          <hr className="border-muted-foreground mx-auto my-2 w-16" />
          <div className="w-full">
            <p className="
                mx-auto
                max-w-prose
                text-muted-foreground
                text-sm sm:text-base
                leading-relaxed
                text-left sm:text-justify
              ">
              I am seeking projects that let me combine analytical thinking with technical skills to develop impactful solutions in molecular bioengineering. My interests lie in leveraging bioinformatics within the biotech industry and exploring how computational methods can drive innovation in healthcare and biological research. I hope to pursue opportunities—both within and beyond my studies—that bridge science, technology and industry needs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            <Link
              href="https://github.com/aahmeddev"
              target="_blank"
              className={cn(buttonVariants({ size: "lg" }))}
              aria-label="View Ahmed Ahmed's GitHub profile"
            >
              <Icons.gitHub className="w-4 h-4 mr-2" /> GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/ahmed-ahmed-37554021a/"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              aria-label="View Ahmed's LinkedIn profile"
            >
              <Icons.linkedin className="w-4 h-4 mr-2" /> LinkedIn
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <AnimatedSection
        className="container space-y-6 bg-muted py-10"
        id="skills"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            {pagesConfig.skills.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.skills.description}
          </AnimatedText>
        </div>
        <SkillsCard skills={featuredSkills} />
        <AnimatedText delay={0.4} className="flex justify-center">
          <Link href="/skills">
            <Button variant={"outline"} className="rounded-xl">
              <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
            </Button>
          </Link>
        </AnimatedText>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection
        direction="right"
        className="container space-y-6 py-10 my-14"
        id="experience"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            {pagesConfig.projects.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.projects.description}
          </AnimatedText>
        </div>
        <div className="mx-auto grid justify-center gap-4 md:w-full lg:grid-cols-3">
          {featuredExperiences.map((exp, index) => (
            <AnimatedSection
              key={exp.id}
              delay={0.1 * (index + 1)}
              direction="up"
            >
              <ProjectCard project={exp} />
            </AnimatedSection>
          ))}
        </div>
        <AnimatedText delay={0.4} className="flex justify-center">
          <Link href="/projects">
            <Button variant={"outline"} className="rounded-xl">
              <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
            </Button>
          </Link>
        </AnimatedText>
      </AnimatedSection>

      {/* Blog Section */}
      <AnimatedSection
        direction="down"
        className="container space-y-6 bg-muted py-10 my-14"
        id="blog"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            {pagesConfig.blog.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.blog.description}
          </AnimatedText>
        </div>
        <div className="mx-auto justify-center gap-4 md:w-full lg:grid-cols-3">
          <BlogCard blogs={featuredBlogs} />
        </div>
        <AnimatedText delay={0.4} className="flex justify-center">
          <Link href="/blog">
            <Button variant={"outline"} className="rounded-xl">
              <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
            </Button>
          </Link>
        </AnimatedText>
      </AnimatedSection>
    </ClientPageWrapper>
  );
}
