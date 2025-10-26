import { Logo, LangToggle, ThemeToggle } from "@/shared/components";

export const Navbar = () => {
  return (
    <header className="bg-background flex h-20 w-full flex-row items-center px-4 py-2 md:px-24">
      <Logo withText />

      <nav className="flex size-full flex-row items-center justify-end gap-4">
        <LangToggle />
        <ThemeToggle />
      </nav>
    </header>
  );
};
