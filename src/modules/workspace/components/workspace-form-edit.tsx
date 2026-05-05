"use client";
import { I18nMessage, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast, useModal } from "@/shared/hooks";
import type { Workspace } from "@prisma/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, Cancel, IconPicker, Input } from "@/shared/components";
import { workspaceWithId, type WorkspaceWithId } from "@/modules/workspace/schema";
import { TypePicker } from "@/modules/workspace/components";
import { trpc, useUtils } from "@/trpc/client";

export const WorkspaceFormEdit = (workspace: Workspace) => {
  const toast = useToast();
  const t = useTranslations("workspaces");
  const { closeModal } = useModal();

  /* use trpc api services and utils to request and refresh data */
  const utils = useUtils();
  const { mutateAsync } = trpc.workspace.edit.useMutation({
    onSuccess: () => utils.workspace.getAll.invalidate(),
  });

  const form = useForm<WorkspaceWithId>({
    resolver: zodResolver(workspaceWithId),
    defaultValues: {
      id: workspace.id,
      name: workspace.name,
      type: workspace.type,
      logo: workspace.logo || "collection:black",
    },
  });

  const { formState } = form;

  const onSubmit = async (values: WorkspaceWithId) => {
    const { status, message } = await mutateAsync(values);

    if (status === "error" && message) {
      toast({ message, type: "error" });
      return;
    }

    closeModal();
    toast({ message: message as I18nMessage, type: "success" });
  };

  return (
    <div className="flex h-auto w-full flex-col justify-center md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-col gap-5 py-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("form.name.label")}</FormLabel>
                  <FormControl className="flex w-full">
                    <Input
                      {...field}
                      type="text"
                      isBordered
                      placeholder={t("form.name.placeholder")}
                      value={field.value as string}
                      variant="outline"
                      icon="collection"
                      className="text-foreground w-full"
                      child={
                        <FormField
                          control={form.control}
                          name="logo"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <IconPicker
                                  value={field.value as string}
                                  onChange={field.onChange}
                                  withLocalDevice={false}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      }
                    />
                  </FormControl>
                  {formState.errors["name"] && <FormMessage />}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1">
                  <FormLabel>{t("form.workspace-type")}</FormLabel>
                  <FormControl>
                    <TypePicker value={field.value as string} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-10 flex w-full flex-col gap-2 md:flex-row-reverse">
            <Button type="submit" icon="save" isLoading={formState.isSubmitting} className="w-full md:w-fit">
              {t("form.submit-button")}
            </Button>
            <Cancel onModal className="w-full md:w-32">
              {t("form.cancel-button")}
            </Cancel>
          </div>
        </form>
      </Form>
    </div>
  );
};
