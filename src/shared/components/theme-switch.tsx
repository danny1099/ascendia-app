"use client";
import { useSystemTheme, useIsClient } from "@/shared/hooks";
import { SwitchThumb } from "@/shared/components/switch";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useSystemTheme();
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <SwitchThumb
      icon={theme === "dark" ? "sun" : "moon"}
      checked={theme === "dark"}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      className="h-7 w-12"
      thumbClassName="h-6 w-6 data-[state=checked]:translate-x-5"
    />
  );
};
