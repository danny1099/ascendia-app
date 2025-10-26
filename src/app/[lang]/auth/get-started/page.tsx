import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Title, P } from "@/shared/components";
import { FormRegister } from "@/modules/auth/components";

export default async function GetStarted() {
  const t = await getTranslations("get_started");

  return (
    <section className="relative flex size-full flex-col items-center py-5">
      <div className="flex h-fit flex-col px-4 md:w-1/3">
        <Title>{t("title")}</Title>
        <P className="-mt-1">{t("description")}</P>
      </div>
      <FormRegister />
    </section>
  );
}

export const metadata: Metadata = {
  title: "Get Started",
  description: "Get started with Ascendia - Your journey as a leader starts here.",
};
