"use client";
import { useTranslations } from "next-intl";
import { getPrivateRoute } from "@/routes/utils";
import { Badge, Button, Separator } from "@/shared/components";
import { auth } from "@/modules/auth/client";

export const AuthWithOauth = () => {
  const lastMethod = auth.getLastUsedLoginMethod();
  const redirectTo = getPrivateRoute("onboarding");
  const t = useTranslations("sign_in");

  return (
    <div className="relative flex h-fit w-full flex-col items-center gap-3 py-2">
      {lastMethod === "google" && (
        <Badge variant="outline" className="absolute -right-2 -mt-2">
          {t("last_method")}
        </Badge>
      )}
      <Button
        icon="google"
        variant="accent"
        place="start"
        className="w-full cursor-pointer"
        onClick={async () =>
          await auth.signIn.social({
            provider: "google",
            callbackURL: redirectTo,
          })
        }
      >
        Google
      </Button>
      <Separator type="horizontal" text="OR" className="my-3 w-full" />
    </div>
  );
};
