"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, IconName, Popover, PopoverContent, PopoverTrigger } from "@/shared/components";
import { cn, colors, getColors, appIcons } from "@/shared/utils";

interface Props {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}

/* prettier-ignore */
export const IconAndColorPicker = ({ value, onChange, className }: Props) => {
  const [selected, setSelected] = useState({ icon: value.split("-")[0], color: value.split("-")[1] });
  const t = useTranslations("icons");

  const handleSelect = (value: string) => {
    setSelected({ icon: value.split("-")[0], color: value.split("-")[1] });
    onChange!(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" icon={selected.icon as IconName} size="icon" className={cn("shrink-0", getColors(selected.color).base, className)} />
      </PopoverTrigger>
      <PopoverContent className="w-74 flex flex-col max-sm:w-68" align="start">
        <div className="flex flex-col rounded-sm px-2 py-1">
          <p className="text-foreground text-xs font-medium">{t("title")}</p>
          <span className="text-3xs text-foreground-muted">{t("description")}</ span>
        </div>
        <div className="mt-3 flex w-full flex-row flex-wrap justify-around gap-2 px-2">
          {Object.entries(colors).map(([colorName]) => {
            const color = getColors(colorName);
            const isSelected = selected.color === colorName;
            return (
              <button
                key={colorName}
                onClick={() => handleSelect(`${selected.icon}-${colorName}`)}
                className={cn("size-4 rounded-full", color.base, isSelected && "ring-2 ring-offset-2")}
              />
            );
          })}
        </div>
        <div className="mt-5 flex w-full flex-row flex-wrap gap-2 px-1 md:justify-around">
          {appIcons.map((iconName) => {
            const isSelected = selected.icon === iconName;
            return (
              <Button
                key={iconName}
                type="button"
                variant="outline"
                icon={iconName as IconName}
                size="icon"
                className={cn("size-8 shrink-0", isSelected && `ring-2 ring-offset-1`, isSelected && getColors(selected.color).base)}
                onClick={() => handleSelect(`${iconName}-${selected.color}`)}
              />
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
