"use client";
import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { Button, Icon } from "@/shared/components";
import { useIsClient, useSystemTheme } from "@/shared/hooks";
import { cn } from "@/shared/utils";

interface ThemeToggleProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const ThemeToggle = ({ className, duration = 400, ...props }: ThemeToggleProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isClient = useIsClient();
  const { theme, setTheme } = useSystemTheme();

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => setTheme(theme === "dark" ? "light" : "dark"));
    }).ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [theme, duration]);

  if (!isClient) return null;

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      onClick={toggleTheme}
      size="icon"
      className={cn("hover:bg-secondary shrink-0", className)}
      {...props}
    >
      {theme === "dark" ? <Icon name="sun" className="size-4" /> : <Icon name="moon" className="size-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
