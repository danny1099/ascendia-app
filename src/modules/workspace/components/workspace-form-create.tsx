"use client";
import { I18nMessage, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal, useToast } from "@/shared/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, Cancel, IconPicker, Input } from "@/shared/components";
import { workspaceSchema, type WorkspaceSchema } from "@/modules/workspace/schema";
import { TypePicker } from "@/modules/workspace/components";
import { trpc, useUtils } from "@/trpc/client";

export const WorkspaceFormCreate = () => {
  const toast = useToast();
  const t = useTranslations("workspaces");
  const { closeModal } = useModal();

  /* use trpc api services and utils to request and refresh data */
  const utils = useUtils();
  const { mutateAsync } = trpc.workspace.create.useMutation({
    onSuccess: () => utils.workspace.getAll.invalidate(),
  });

  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      type: "BUSINESS",
      logo: "collection:black",
    },
  });

  const { formState } = form;

  const onSubmit = async (values: WorkspaceSchema) => {
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
