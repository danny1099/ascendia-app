import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPrivateRoute } from "@/routes/utils";
import { P, Navbar, Title } from "@/shared/components";
import { isAuthenticated } from "@/modules/auth/session";
import { OnboardingSteps } from "@/modules/onboarding/components";

export default async function Onboarding() {
  const { hasOnboarding, organization } = await isAuthenticated();
  const t = await getTranslations("onboarding");

  /* if user has onboarding redirect to overview inmediately */
  const redirectTo = getPrivateRoute("overview", { organization: organization as string });
  if (hasOnboarding) redirect(redirectTo);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar />
      <main className="bg-background flex size-full flex-col items-center gap-2 px-4 py-6 md:px-24">
        <div className="mt-10 flex h-fit w-full flex-col text-center">
          <Title>{t("title")}</Title>
          <P className="line-clamp-2">{t("description")}</P>
        </div>
        <OnboardingSteps />
      </main>
    </div>
  );
}

export const metadata = {
  title: "Onboarding",
  description: "Welcome to your Ascendia journey, let’s get started by creating your key account.",
};
