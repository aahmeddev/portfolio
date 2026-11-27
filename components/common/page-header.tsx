interface PageHeaderProps {
  title: string;
  description: string;
  kicker?: string;
}

export default function PageHeader({ title, description, kicker }: PageHeaderProps) {
  return (
    <>
      <div className="flex flex-col mt-1 items-start gap-3 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-2">
          {kicker && (
            <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-primary">
              {kicker}
            </p>
          )}
          <h1 className="inline-block font-heading text-3xl tracking-tight lg:text-4xl capitalize">
            {title}
          </h1>
          <p className="text-base text-muted-foreground">{description}</p>
        </div>
      </div>
      <hr className="my-5 border-primary/25" />
    </>
  );
}
