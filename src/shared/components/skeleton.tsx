import { cn } from "@/shared/utils";

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("bg-accent animate-pulse rounded-md", className)} {...props} />;
};
