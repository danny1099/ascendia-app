import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "@/lib/i18n/core";

const i18nMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  return i18nMiddleware(request);
}

export const config = {
  matcher: ["/", "/(en|es)/:path*", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
