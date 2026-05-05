import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Title, P, Loader } from "@/shared/components";
import { SimulationList } from "@/modules/simulation/components";
import { trpc, HydrateClient } from "@/trpc/server";

interface SimulationProps {
  params: Promise<{ workspace: string }>;
}

export default async function Simulations({ params }: SimulationProps) {
  const { workspace } = await params;
  const t = await getTranslations("simulations");
  await trpc.simulation.getAll.prefetch({ param: workspace });

  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-16">
      <div className="flex h-fit w-full flex-col">
        <Title className="text-2xl">{t("title")}</Title>
        <P className="text-2xs">{t("description")}</P>
      </div>
      <HydrateClient>
        <Suspense fallback={<Loader />}>
          <SimulationList workspace={workspace} />
        </Suspense>
      </HydrateClient>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Simulations",
  description: "Simulations are the spaces where you can grow and lead with purpose.",
};
