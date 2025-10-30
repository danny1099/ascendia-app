"use client";
import { signIn } from "@/modules/auth/config/client";
import { Button, Separator } from "@/shared/components";

export const AuthWithOauth = () => {
  return (
    <div className="flex h-fit w-full flex-col items-center gap-3 py-2">
      <Button
        icon="google"
        variant="accent"
        place="start"
        className="w-full cursor-pointer"
        onClick={() => signIn.social({ provider: "google" })}
      >
        Google
      </Button>
      <Separator className="my-3 w-full" text="OR" />
    </div>
  );
};
