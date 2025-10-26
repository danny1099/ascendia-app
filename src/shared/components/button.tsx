import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { ctaVariants } from "@/shared/variants";
import { Icon, IconName } from "@/shared/components/icon";
import { cn } from "@/shared/utils";

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof ctaVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  place?: "start" | "end";
  icon?: IconName;
}

/* prettier-ignore */
export const Button = ({ children, className, variant, size, asChild = false, icon, place = "end", isLoading , ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp data-slot="button" {...props} className={cn(ctaVariants({ variant, size, className }))}>
      {place === "start" && icon && (<Icon name={isLoading ? "refresh" : icon } className={cn("size-4", isLoading && "animate-spin")}/>)}
      {children}
      {place === "end" && icon && (<Icon name={isLoading ? "refresh" : icon } className={cn("size-4", isLoading && "animate-spin")}/>)}
    </Comp>
  );
};
