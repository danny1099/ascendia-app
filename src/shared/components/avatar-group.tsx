import { Avatar } from "@/shared/components/avatar";
import { cn } from "@/shared/utils";

interface AvatarGroupProps {
  items: Item[];
  max?: number;
  className?: string;
}

interface Item {
  src: string;
  name: string;
  online?: boolean;
}

export const AvatarGroup = ({ items, max = 4, className }: AvatarGroupProps) => {
  return (
    <div className={cn("flex h-fit w-full items-center -space-x-1 px-1 py-2", className)}>
      {items
        .slice(0, max)
        .sort((a, b) => (b.online ? 1 : 0) - (a.online ? 1 : 0))
        .map(({ src, online }, index) => (
          <Avatar
            key={index}
            src={src}
            className="inline-block transition-transform duration-200 ease-in-out hover:z-10 hover:scale-110"
            ring={online ? "green" : "white"}
            withDot={online}
          />
        ))}
      {items.length > max && (
        <div className="bg-muted text-muted-foreground border-border relative inline-flex size-9 items-center justify-center rounded-full border align-middle text-xs font-medium">
          <span className="font-medium">{items.length - max}+</span>
        </div>
      )}
    </div>
  );
};
