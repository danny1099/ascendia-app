"use client";
import type { Workspace } from "@prisma/client";
import { I18nMessage, useTranslations } from "next-intl";
import { useModal, useToast } from "@/shared/hooks";
import { Button, Cancel, Icon, Title, P } from "@/shared/components";
import { trpc, useUtils } from "@/trpc/client";

export const WorkspaceFormDelete = (workspace: Workspace) => {
  const toast = useToast();
  const t = useTranslations("workspaces.modal");
  const { closeModal } = useModal();

  /* use trpc api services and utils to request and refresh data */
  const utils = useUtils();
  const { mutateAsync, isPending } = trpc.workspace.delete.useMutation({
    onSuccess: () => utils.workspace.getAll.invalidate(),
  });

  const onSubmit = async () => {
    const { status, message } = await mutateAsync({ param: workspace.id });

    if (status === "error" && message) {
      toast({ message, type: "error" });
      return;
    }

    closeModal();
    toast({ message: message as I18nMessage, type: "success" });
  };

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center p-2 md:w-120">
      <div className="bg-destructive/10 mb-2 flex flex-row items-center justify-center rounded-full p-5">
        <Icon name="alert" className="text-destructive size-9" />
      </div>
      <div className="flex flex-col text-center">
        <Title className="text-2xl">{t("delete.title")}</Title>
        <P className="mt-1 text-pretty">
          {t("delete.subtitle")} <br /> {t("delete.description")}
        </P>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="mt-10 flex w-96 flex-row gap-4">
        <div className="flex w-full flex-col justify-center gap-2 md:flex-row-reverse">
          <Button
            type="submit"
            variant="destructive"
            icon="delete"
            isLoading={isPending}
            onClick={onSubmit}
            className="bg-destructive/10 w-full md:w-fit"
          >
            {t("delete.confirm-button")}
          </Button>
          <Cancel onModal className="w-full md:w-fit">
            {t("delete.cancel-button")}
          </Cancel>
        </div>
      </form>
    </div>
  );
};
