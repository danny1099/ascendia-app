"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { useModal } from "@/shared/hooks";
import { OrganizationFormCreate } from "@/modules/organization/components";
import { cn } from "@/shared/utils";

interface Props {
  className?: string;
}

export const AddOrganizationButton = ({ className }: Props) => {
  const { openModal } = useModal();
  const t = useTranslations("organization");

  return (
    <Button
      icon="add"
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <OrganizationFormCreate />,
        });
      }}
      className={cn("dark:bg-tertiary/20 dark:text-tertiary text-xs", className)}
    >
      {t("add-button")}
    </Button>
  );
};
