"use client";
import { useLocale, useTranslations } from "next-intl";
import { type Locale, routing, usePathname, useRouter } from "@/lib/i18n/core";
import { DropdownMenu, MenuContent, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@/shared/components";
import { Button } from "@/shared/components";

export const LangToggle = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  /* get all locales available */
  const t = useTranslations("lang");
  const { locales } = routing;

  const getConfigLocales = () => {
    const langs: { locale: Locale; name: string; description: string; flag: string }[] = [];
    locales.map((lang: Locale) => {
      langs.push({
        locale: lang,
        name: t(`${lang}.locale`),
        description: t(`${lang}.description`),
        flag: `/images/flag-${lang}.png`,
      });
    });
    return langs;
  };

  const handleChangeLang = (newLang: string) => {
    if (currentLocale === newLang) return;
    router.push(pathname, { locale: newLang as Locale, scroll: false });
  };

  return (
    <DropdownMenu>
      <MenuTrigger asChild>
        <Button variant="ghost" size="icon" icon="translate" className="hover:bg-secondary" />
      </MenuTrigger>
      <MenuContent>
        <MenuRadioGroup value={currentLocale} onValueChange={handleChangeLang}>
          {getConfigLocales().map(({ locale, name, description, flag }) => {
            return (
              <MenuRadioItem key={locale} value={locale}>
                <div className="flex flex-row items-center gap-2 text-xs">
                  <img src={flag} alt="Flag of locale selected" className="size-4.5" loading="lazy" />
                  <div className="text-foreground flex flex-col justify-center">
                    <span className="text-xs font-medium uppercase">{name}</span>
                    <p className="text-3xs text-foreground-muted">{description}</p>
                  </div>
                </div>
              </MenuRadioItem>
            );
          })}
        </MenuRadioGroup>
      </MenuContent>
    </DropdownMenu>
  );
};
