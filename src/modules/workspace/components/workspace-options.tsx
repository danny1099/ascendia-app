"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { getPrivateRoute } from "@/routes/utils";
import { cn, toSlug } from "@/shared/utils";
import { useModal } from "@/shared/hooks";
import { Button, Divider, IconName, Popover, PopoverContent, PopoverTrigger } from "@/shared/components";
import { WorkspaceFormEdit, WorkspaceFormDelete } from "@/modules/workspace/components";
import type { Workspace } from "@/modules/workspace/types";

export function ButtonActions(workspace: Workspace) {
  const router = useRouter();
  const { openModal } = useModal();
  const t = useTranslations("workspaces");

  const items = [
    {
      name: "manage",
      label: t("options.get_into"),
      icon: "collection",
      onClick: () => getIntoWorkspace(),
    },
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

  const getIntoWorkspace = () => {
    const goToWorkspace = getPrivateRoute("dashboard", {
      organization: toSlug(workspace.organization as string),
      workspace: toSlug(workspace.slug),
    });
    router.push(goToWorkspace);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          icon="options"
          variant="ghost"
          size="icon"
          className="text-tertiary md:invisible group-hover:md:visible"
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-44 flex-col gap-1">
        {items.map(({ name, icon, label, onClick }) => {
          return (
            <div key={name} className="flex flex-col">
              {name === "delete" && <Divider type="horizontal" className="my-1.5 w-full" />}
              <Button
                icon={icon as IconName}
                place="start"
                size="sm"
                variant={name === "delete" ? "destructive" : "item"}
                onClick={onClick}
                className={cn("text-2xs w-auto justify-start gap-2 font-normal [&_svg]:size-3.5")}
              >
                {label}
              </Button>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
