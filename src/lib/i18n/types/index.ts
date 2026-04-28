import en_ui from "@/lib/i18n/locales/en/ui.json";
import en_messages from "@/lib/i18n/locales/en/messages.json";
import type { routing } from "@/lib/i18n/core";

export type LangEn = typeof en_ui & typeof en_messages;

declare module "next-intl" {
  interface AppConfig {
    Messages: LangEn;
    Locale: (typeof routing.locales)[number];
  }

  type I18nMessage = keyof LangEn["messages"];
  type I18nValidation = LangEn["validation"];
}
