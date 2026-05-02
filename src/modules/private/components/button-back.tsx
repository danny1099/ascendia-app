"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components";
import { cn } from "@/shared/utils";

interface ButtonBackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Back = ({ className }: ButtonBackProps) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      icon="chevronLeft"
      onClick={() => router.back()}
      className={cn("hover:text-tertiary hover:bg-accent absolute top-1 -left-8 z-10 shrink-0 items-center", className)}
    />
  );
};
