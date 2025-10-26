import { cn } from "@/shared/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

/* prettier-ignore */
export const Title = ({ children, className ,...props }: Props) => {
  return (
    <h1 {...props} className={cn("text-2xl md:text-4xl text-foreground leading-tight font-bold", className)}>
      {children}
    </h1>
  );
};
