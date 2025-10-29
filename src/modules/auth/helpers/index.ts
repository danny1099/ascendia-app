import { cache } from "react";
import { auth } from "@/modules/auth/core";

export const getAuthSession = cache(async () => await auth());
