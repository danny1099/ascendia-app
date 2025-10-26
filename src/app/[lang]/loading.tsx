import { getTranslations } from "next-intl/server";
import { P, Heading, Logo } from "@/shared/components";

export default async function Loading() {
  const t = await getTranslations("messages.loading");

  return (
    <div className="bg-background flex h-dvh flex-row items-center justify-center gap-2 opacity-85">
      <Logo className="shrink-0 animate-pulse" />
      <div className="flex flex-col">
        <Heading type="h6" className="text-foreground text-sm font-medium">
          {t("title")}
        </Heading>
        <P className="-mt-0.5">{t("message")}</P>
      </div>
    </div>
  );
}
