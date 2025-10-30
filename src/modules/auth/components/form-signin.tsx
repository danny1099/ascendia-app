"use client";
import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPrivateRoute } from "@/config/routes";
import { useToast } from "@/shared/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Input, Button, InputPassword } from "@/shared/components";
import { AuthWithOauth, FormNavigate } from "@/modules/auth/components";
import { AuthSchema, authSchema } from "@/modules/auth/schema";
import { signIn } from "@/modules/auth/config/client";

export const FormSignIn = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const toast = useToast();

  /* i18n hooks translations and messages */
  const t = useTranslations("auth");

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
      const { data, error } = await signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error || !data) {
        toast(`auth/${error.code}`, "error");
        return;
      }

      /* handle success if user is signed in successfully */
      const { user } = data;
      if (user.id) {
        router.push(getPrivateRoute({ route: "Onboarding" }), { scroll: false });
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
        <FormNavigate origin="login" />
      </Form>
    </article>
  );
};
