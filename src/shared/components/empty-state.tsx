import { Title, P } from "@/shared/components";
import { cn } from "@/shared/utils";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  className?: string;
}

export const EmptyData = ({ title, subtitle, className }: EmptyStateProps) => {
  return (
    <div className={cn("flex size-full flex-col items-center justify-center", className)}>
      <picture>
        <source srcSet="/images/empty-state-dark.png" media="(prefers-color-scheme: dark)" />
        <img src="/images/empty-state.png" alt="No results" className="mb-4 size-auto object-cover" loading="eager" />
      </picture>
      <Title className="text-foreground text-sm">{title}</Title>
      <P className="text-2xs">{subtitle}</P>
    </div>
  );
};
