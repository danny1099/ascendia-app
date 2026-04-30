import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Title, Icon, Box } from "@/shared/components";
import { getPublicRoute } from "@/routes/utils";
import { VerityEmailForm } from "@/modules/auth/components";

interface ConfirmEmailProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VerifyEmail({ searchParams }: ConfirmEmailProps) {
  const query = (await searchParams).token as string;
  const redirectTo = getPublicRoute("sign_in");
  const t = await getTranslations("verify_email");

  if (!query) redirect(redirectTo);

  return (
    <section className="flex size-full flex-col items-center justify-center py-5">
      <div className="flex h-fit flex-col items-center gap-3">
        <div className="dark:bg-tertiary/10 bg-accent flex size-20 items-center justify-center rounded-full p-2">
          <Icon name="emailSend" className="text-tertiary size-12" />
        </div>
        <Title className="text-center text-2xl md:text-4xl">{t("title")}</Title>
      </div>
      <VerityEmailForm token={query} />
    </section>
  );
}

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address. Your journey as a leader starts here.",
};
