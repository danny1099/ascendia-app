"use client";
import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { getPrivateRoute } from "@/config/routes";
import { useToast } from "@/shared/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Input, Button, InputPassword } from "@/shared/components";
import { AuthWithOauth, FormNavigate } from "@/modules/auth/components";
import { authSchema, AuthSchema } from "@/modules/auth/schema";
import { trpc } from "@/trpc/client";

export const FormRegister = () => {
  const [isPending, startTransition] = useTransition();
  const redirectTo = getPrivateRoute({ route: "Onboarding" });
  const router = useRouter();
  const toast = useToast();

  /* i18n hooks translations and messages */
  const t = useTranslations("auth");
  const api = trpc.auth.signUpWithEmail.useMutation();

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /* use form state to get errors */
  const { formState } = form;

  const onSubmit = async (values: AuthSchema) => {
    startTransition(async () => {
      const { result, message, status } = await api.mutateAsync(values);

      /* handle error if any occurs while signing up user */
      if (status === "error") {
        toast(message as string, "error");
        return;
      }

      /* handle success if user is created successfully sign in immediately */
      if (result?.id) {
        toast("auth/success-signup", "success");
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        }).then(() => router.push(redirectTo, { scroll: false }));
      }
    });
  };

  return (
    <article className="mt-6 flex size-full flex-col px-4 md:w-1/3">
      <AuthWithOauth />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex size-full flex-col gap-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email.label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("email.placeholder")}
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password.label")}</FormLabel>
                  <FormControl>
                    <InputPassword
                      {...field}
                      type="text"
                      placeholder={t("password.placeholder")}
                      value={field.value as string}
                      variant="outline"
                      className="text-foreground w-full"
                    />
                  </FormControl>
                  {formState.errors["password"] && <FormMessage />}
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2 w-full" icon="arrowRight" isLoading={isPending}>
              {t("submit-button")}
            </Button>
          </div>
        </form>
        <FormNavigate origin="signup" />
      </Form>
    </article>
  );
};
