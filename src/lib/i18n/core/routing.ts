import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

/* get all messages translation config */
export type LangEn = typeof import("@/lib/i18n/lang/en.json");
