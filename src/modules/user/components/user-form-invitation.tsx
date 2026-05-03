"use client";
import { useForm } from "react-hook-form";
import { I18nMessage, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal, useToast } from "@/shared/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, Cancel, Input } from "@/shared/components";
import { userInvitationSchema, type UserInvitationSchema } from "@/modules/user/schema";
import { trpc, useUtils } from "@/trpc/client";

export const UserFormInvitation = () => {
  const toast = useToast();
  const t = useTranslations("users.invitation");
  const { closeModal } = useModal();

  /* use trpc api services and utils to request and refresh data */
  const utils = useUtils();
  const { mutateAsync } = trpc.user.invite.useMutation({
    onSuccess: () => utils.user.getAll.invalidate(),
  });

  const form = useForm<UserInvitationSchema>({
    resolver: zodResolver(userInvitationSchema),
    defaultValues: {
      email: "",
      role: "member",
    },
  });

  const onSubmit = async (values: UserInvitationSchema) => {
    const { error, message } = await mutateAsync(values);

    if (error && message) {
      toast({ message, type: "error" });
      return;
    }

    /* close the modal and show a success message */
    closeModal();
    toast({ message: message as I18nMessage, type: "success" });
  };

  const { formState } = form;

  return (
    <div className="flex h-auto w-full flex-col justify-center md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-col gap-3 py-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.invite.label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={t("form.invite.placeholder")}
                      value={field.value as string}
                      variant="outline"
                      icon="email"
                      className="text-foreground w-full"
                    />
                  </FormControl>
                  {formState.errors["email"] && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
          <div className="mt-10 flex w-full flex-col gap-2 md:flex-row-reverse">
            <Button type="submit" icon="send" isLoading={formState.isSubmitting} className="w-full md:w-auto">
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
