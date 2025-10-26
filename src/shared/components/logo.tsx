import { cn } from "@/shared/utils";
import { Brand } from "@/shared/components/brand";

interface Props {
  className?: string;
  withText?: boolean;
}

export const Logo = ({ withText, className }: Props) => {
  return (
    <div className="flex h-full items-center gap-1.5">
      <picture className="size-8 shrink-0">
        <source srcSet="/images/app-logo_dark.svg" media="(prefers-color-scheme: dark)" />
        <img
          src="/images/app-logo.svg"
          alt="Logo of DoIt Task Manager"
          className={cn("size-8", className)}
          loading="eager"
        />
      </picture>
      {withText && <Brand />}
    </div>
  );
};
