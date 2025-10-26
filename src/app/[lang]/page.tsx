import { getTranslations } from "next-intl/server";
import { Navbar, Navlink, P, PatternUI, Title } from "@/shared/components";
import { sleep } from "@/shared/utils";

export default async function Home() {
  const t = await getTranslations("marketing");
  await sleep(3000);

  return (
    <div className="flex h-dvh flex-col">
      <Navbar />
      <main className="flex size-full flex-col items-center justify-center text-center">
        <Title>{t("title")}</Title>
        <P className="-mt-1">{t("description")}</P>

        <section className="flex w-full flex-row justify-center gap-4 pt-6">
          <Navlink href="/auth/sign-in" variant="outline">
            Sign In
          </Navlink>
          <Navlink href="/auth/get-started" icon="arrowRight">
            Get Started for Free
          </Navlink>
        </section>
      </main>
      <PatternUI />
    </div>
  );
}
