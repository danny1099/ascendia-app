"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { useModal } from "@/shared/hooks";
import { cn } from "@/shared/utils";
import { WorkspaceFormCreate } from "@/modules/workspace/components";

interface Props {
  className?: string;
}

export const AddWorkspaceButton = ({ className }: Props) => {
  const { openModal } = useModal();
  const t = useTranslations("workspaces");

  return (
    <Button
      icon="add"
      variant="flat"
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <WorkspaceFormCreate />,
        });
      }}
      className={cn("text-xs", className)}
    >
      {t("add-button")}
    </Button>
  );
};
