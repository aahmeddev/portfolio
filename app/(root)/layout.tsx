import { ArchiveBinderShell } from "@/components/common/archive-binder-shell";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return <ArchiveBinderShell>{children}</ArchiveBinderShell>;
}
