import { type VariantProps } from "class-variance-authority";
import { avatarVariants } from "@/shared/variants";
import { cn } from "@/shared/utils";
import { Dot } from "./dot";
import { Icon } from "./icon";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  isBordered?: boolean;
  withDot?: boolean;
}

/* prettier-ignore */
export const Avatar = ({ src, className, variant, size, ring = "green", isBordered, withDot }: AvatarProps) => {
  return (
    <div className={cn(avatarVariants({ variant, size, ring }), isBordered && "border border-border", className)}>
      {src 
          ? (<img src={src} alt="Avatar image" className="object-cover rounded-full"/>) 
          : (<div className="flex items-center rounded-full justify-center w-full h-full bg-secondary">
              <Icon name="person" className="text-foreground-muted size-4.5" />
            </div>)
      }
      {withDot && <Dot color={ring === "white" ? "green" : ring} className="absolute -bottom-0.5 right-0 ring-1 ring-white ring-offset-1" />}
    </div>
  );
};
