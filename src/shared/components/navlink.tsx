import type { Route } from "next";
import Link, { LinkProps } from "next/link";
import { VariantProps } from "class-variance-authority";
import { Icon, IconName } from "@/shared/components/icon";
import { ctaVariants } from "@/shared/variants";
import { cn } from "@/shared/utils";

interface Props extends LinkProps<Route>, VariantProps<typeof ctaVariants> {
  children: React.ReactNode;
  icon?: IconName;
  place?: "start" | "end";
  className?: string;
  isLoading?: boolean;
}

/* prettier-ignore */
export const Navlink = ({ children, variant, size, icon, place, isLoading, className, align, bordered, href, ...props }: Props) => {
  return (
    <Link {...props} href={href as Route} className={cn(ctaVariants({ variant, size, bordered, className, align }), place === 'start' ? 'flex-row' : 'flex-row-reverse')}>
      {icon && <Icon name={isLoading ? "refresh" : icon} className="size-4" />}
      {children}
    </Link>
  )
}
