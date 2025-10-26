import { cn } from "@/shared/utils";

type Props = React.HTMLAttributes<HTMLParagraphElement>;

export const P = ({ children, ...props }: Props) => {
  return (
    <p {...props} className={cn("text-foreground-muted text-xs", props.className)}>
      {children}
    </p>
  );
};
