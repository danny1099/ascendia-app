import { type VariantProps } from "class-variance-authority";
import { dotVariants } from "@/shared/variants";
import { cn } from "@/shared/utils";

export interface DotProps extends VariantProps<typeof dotVariants> {
  className?: string;
}

/* prettier-ignore */
export const Dot = ({ color = "black", size, radius, className }: DotProps) => {
  return (
    <span className={cn(dotVariants({ color, size, radius }), className)}/>
  );
};
