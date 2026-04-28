"use client";
import { Toaster as SileoToaster } from "sileo";
import { useSystemTheme } from "@/shared/hooks";

type ToasterProps = React.ComponentProps<typeof SileoToaster>;

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useSystemTheme();

  return (
    <SileoToaster
      {...props}
      theme={theme as ToasterProps["theme"]}
      position="top-right"
      options={{
        duration: 5000,
        fill: "#171717",
        roundness: 16,
        styles: {
          title: "text-xs!",
          description: "text-white/85! text-2xs!",
        },
      }}
    />
  );
};
