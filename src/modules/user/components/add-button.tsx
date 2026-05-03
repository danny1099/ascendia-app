"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { useModal } from "@/shared/hooks";
import { cn } from "@/shared/utils";

interface Props {
  className?: string;
}

export const AddMemberButton = ({ className }: Props) => {
  const { openModal } = useModal();
  const t = useTranslations("users");

  return (
    <Button
      icon="add"
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <div />,
        });
      }}
      className={cn("text-xs", className)}
    >
      {t("add-button")}
    </Button>
  );
};
