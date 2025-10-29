"use client";
import { signIn } from "next-auth/react";
import { getPrivateRoute } from "@/config/routes";
import { Button, Separator } from "@/shared/components";

export const AuthWithOauth = () => {
  const redirectTo = getPrivateRoute({ route: "Onboarding" });

  return (
    <div className="flex h-fit w-full flex-col items-center gap-3 py-2">
      <Button
        icon="google"
        variant="accent"
        place="start"
        className="w-full cursor-pointer"
        onClick={() => signIn("google", { redirectTo })}
      >
        Google
      </Button>
      <Separator className="my-3 w-full" text="OR" />
    </div>
  );
};
