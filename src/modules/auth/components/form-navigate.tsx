"use client";
import { useTranslations } from "next-intl";
import { Navlink } from "@/shared/components";

interface FormNavigateProps {
  origin: "login" | "signup";
  className?: string;
}

export const FormNavigate = ({ origin }: FormNavigateProps) => {
  const t = useTranslations(`${origin === "signup" ? "get_started" : "sign_in"}.navigate`);
  const routePath = origin === "signup" ? "/auth/sign-in" : "/auth/get-started";

  return (
    <div className="bg-background mt-1 flex h-fit w-full flex-col items-center justify-center gap-2 text-center">
      <span className="text-muted-foreground text-2xs mt-2 inline-flex items-center gap-1">
        {t("text")}
        <Navlink href={routePath} variant="ghost" className="text-tertiary text-2xs h-fit w-auto p-0">
          {t("link")}
        </Navlink>
      </span>
    </div>
  );
};
