import { Metadata } from "next";
import { Title, P } from "@/shared/components";

interface DashboardProps {
  params: Promise<{ workspace: string }>;
}

export default async function Dashboard({ params }: DashboardProps) {
  const { workspace } = await params;

  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-16">
      <div className="flex h-fit w-full flex-col">
        <Title className="text-2xl">Dashboard</Title>
        <P className="text-2xs">Here you can see an overview of your workspace and its leaders.</P>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard of your workspace and its leaders.",
};
