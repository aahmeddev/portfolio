import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ProjectCard from "@/components/experience/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Experiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.projects.metadata.title,
  description: pagesConfig.projects.description,
};

const renderContent = (tabVal: string) => {
  let expArr = Experiences;
  if (tabVal === "sequencing") {
    expArr = expArr.filter((val) => val.type === "Sequencing & Bioinformatics");
  } else if (tabVal === "hardware") {
    expArr = expArr.filter((val) => val.type === "Hardware & Medtech");
  } else if (tabVal === "systems") {
    expArr = expArr.filter((val) => val.type === "Wet Lab & Systems");
  }

  return (
    <div className="mx-auto my-6 grid justify-center gap-6 md:grid-cols-2 xl:grid-cols-3 static">
      {expArr.map((exp) => (
        <ProjectCard project={exp} key={exp.id} />
      ))}
    </div>
  );
};

export default function ExperiencePage() {
  return (
    <PageContainer
      title={pagesConfig.projects.title}
      description={pagesConfig.projects.description}
    >
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid max-w-3xl mx-auto grid-cols-2 sm:grid-cols-4 h-auto gap-1 p-1">
          <TabsTrigger value="all">All ({Experiences.length})</TabsTrigger>
          <TabsTrigger value="sequencing">AI, Data &amp; Bioinfo</TabsTrigger>
          <TabsTrigger value="hardware">Hardware &amp; Medtech</TabsTrigger>
          <TabsTrigger value="systems">Wet Lab &amp; Systems</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="w-full">
          {renderContent("all")}
        </TabsContent>
        <TabsContent value="sequencing" className="w-full">
          {renderContent("sequencing")}
        </TabsContent>
        <TabsContent value="hardware" className="w-full">
          {renderContent("hardware")}
        </TabsContent>
        <TabsContent value="systems" className="w-full">
          {renderContent("systems")}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
