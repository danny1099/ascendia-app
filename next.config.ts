import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};
const withNextIntl = createNextIntlPlugin({ requestConfig: "./src/lib/i18n/core/request.ts" });

export default withNextIntl(nextConfig);
