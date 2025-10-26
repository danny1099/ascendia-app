import { cn } from "@/shared/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  type?: "h2" | "h3" | "h4" | "h5" | "h6";
}

/* prettier-ignore */
export const Heading = ({ children, type = "h2", ...props }: Props) => {
  const Tag: keyof React.JSX.IntrinsicElements = type;

  return (
    <Tag {...props} className={cn("text-2xl font-semibold text-foreground", props.className)}>
      {children}
    </Tag>
  );
};
