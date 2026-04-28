import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/* prettier-ignore */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  /* get all messages from locales config */
  const messages  = {
    ...(await import(`@/lib/i18n/locales/${locale}/ui.json`)).default,
    ...(await import(`@/lib/i18n/locales/${locale}/messages.json`)).default,
  }

  return {locale, messages}
});
