import { Aside, Navbar } from "@/modules/private/components";

export default async function Layout({ children }: Children) {
  return (
    <div className="grid h-dvh grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-auto">
      <Navbar />
      <Aside child={<div />} />
      <main className="bg-background col-span-2 col-start-2 row-start-2 size-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
