"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon, IconName, P, CheckboxCard } from "@/shared/components";

interface TypePickerProps {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const TypePicker = ({ value = "education", onChange }: TypePickerProps) => {
  const [selected, setSelected] = useState<string>(value);
  const t = useTranslations("workspaces.types");

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange!(value);
  };

  const typesWorkspace = [
    {
      name: "INDIVIDUAL",
      icon: "personal",
      label: t("individual.label"),
      placeholder: t("individual.placeholder"),
    },
    {
      name: "BUSINESS",
      icon: "company",
      label: t("business.label"),
      placeholder: t("business.placeholder"),
    },
    {
      name: "assessment",
      icon: "nonProfit",
      label: t("assessment.label"),
      placeholder: t("assessment.placeholder"),
    },
  ];

  return (
    <div className="mt-0.5 flex w-full flex-row items-center justify-between gap-4">
      {typesWorkspace.map(({ name, icon, label, placeholder }) => (
        <CheckboxCard
          key={name}
          value={name}
          checked={selected === name}
          onCheckedChange={(checked) => {
            return checked ? handleSelect(name) : handleSelect("");
          }}
        >
          <div className="border-input flex h-24 w-auto max-w-40 flex-col items-center justify-center gap-1 rounded-md border p-2">
            <Icon name={icon as IconName} className="text-foreground mt-2 size-6 shrink-0" />
            <div className="grid w-full flex-1 text-center">
              <P className="text-accent-foreground text-2xs font-medium">{label}</P>
              <span className="text-3xs text-muted-foreground max-sm:line-clamp-2">{placeholder}</span>
            </div>
          </div>
        </CheckboxCard>
      ))}
    </div>
  );
};
