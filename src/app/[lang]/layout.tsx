import type { Metadata } from "next";
import { globalFont } from "@/config/fonts";
import { I18nProvider, ThemeProvider, TrpcProvider, SessionProvider } from "@/lib/providers";
import { Toaster } from "@/shared/components";
import "@/globals.css";

interface RootLayoutProps extends Children {
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${globalFont.className} antialiased`}>
        <I18nProvider>
          <ThemeProvider>
            <SessionProvider>
              <TrpcProvider>{children}</TrpcProvider>
            </SessionProvider>
            <Toaster position="top-right" />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Ascendia | Leadership Simulator",
    template: "%s | Ascendia Simulator",
  },
  description:
    "An advanced leadership simulator that develops strategic skills through realistic dilemmas involving limited resources, role rotation, and high-impact collaborative decisions.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/app-logo.svg",
        href: "/images/app-logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/app-logo_dark.svg",
        href: "/images/app-logo_dark.svg",
      },
    ],
  },
};
