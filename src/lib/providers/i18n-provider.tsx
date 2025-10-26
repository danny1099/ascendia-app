import { NextIntlClientProvider, useMessages } from "next-intl";

/* prettier-ignore */
export const I18nProvider = ({ children }: Children) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
