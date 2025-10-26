import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Title, P } from "@/shared/components";

export default async function SignIn() {
  const t = await getTranslations("sign_in");

  return (
    <section className="flex size-full flex-col items-center py-5">
      <div className="flex h-fit flex-col px-4">
        <Title>{t("title")}</Title>
        <P className="-mt-1">{t("description")}</P>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Ascendia account and keep building leadership that inspires others.",
};
