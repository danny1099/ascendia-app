import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Title, P, Loader } from "@/shared/components";
import { WorkspacesList } from "@/modules/workspace/components";
import { trpc, HydrateClient } from "@/trpc/server";

export default async function Workspaces() {
  const t = await getTranslations("workspaces");
  await trpc.workspace.getAll.prefetch();

  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-16">
      <div className="flex h-fit w-full flex-col">
        <Title className="text-2xl">{t("title")}</Title>
        <P className="text-2xs">{t("description")}</P>
      </div>
      <HydrateClient>
        <Suspense fallback={<Loader />}>
          <WorkspacesList />
        </Suspense>
      </HydrateClient>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Workspaces",
  description: "Workspaces are the spaces where you can grow and lead with purpose.",
};
