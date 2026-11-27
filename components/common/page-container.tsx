import React from "react";
import { ClientPageWrapper } from "./client-page-wrapper";
import PageHeader from "./page-header";

interface PageContainerProps {
  title: string;
  description: string;
  kicker?: string;
  children: React.ReactNode;
}

export default function PageContainer({
  title,
  description,
  kicker,
  children,
}: PageContainerProps) {
  return (
    <ClientPageWrapper>
      <div className="w-full max-w-6xl mx-auto px-1 sm:px-2">
        <PageHeader title={title} description={description} kicker={kicker} />
        <div className="w-full">{children}</div>
      </div>
    </ClientPageWrapper>
  );
}
