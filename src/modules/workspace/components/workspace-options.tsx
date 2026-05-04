"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { getPrivateRoute } from "@/routes/utils";
import { toSlug } from "@/shared/utils";
import { useModal } from "@/shared/hooks";
import { ButtonDropdown } from "@/shared/components";
import { WorkspaceFormEdit, WorkspaceFormDelete } from "@/modules/workspace/components";
import type { Workspace } from "@/modules/workspace/types";

export function ButtonActions(workspace: Workspace) {
  const router = useRouter();
  const { openModal } = useModal();
  const t = useTranslations("workspaces");

  const items = [
    {
      name: "edit",
      label: t("options.edit"),
      icon: "edit",
      onClick: () =>
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <WorkspaceFormEdit {...workspace} />,
        }),
    },
    {
      name: "delete",
      label: t("options.delete"),
      icon: "delete",
      onClick: () => {
        openModal({
          content: <WorkspaceFormDelete {...workspace} />,
        });
      },
    },
  ];

  const launchWorkspace = () => {
    const goToWorkspace = getPrivateRoute("dashboard", {
      organization: toSlug(workspace.organization as string),
      workspace: toSlug(workspace.slug),
    });
    router.push(goToWorkspace);
  };

  return (
    <ButtonDropdown
      onClick={() => launchWorkspace()}
      variant="outline"
      size="sm"
      items={items}
      className="whitespace-nowrap"
    >
      {t("options.enter")}
    </ButtonDropdown>
  );
}
