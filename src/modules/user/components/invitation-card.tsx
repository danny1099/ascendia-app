"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getPrivateRoute } from "@/routes/utils";
import { Icon, P, Button, Box } from "@/shared/components";
import { trpc } from "@/trpc/client";

export const InvitationCard = () => {
  const t = useTranslations("users.invitations");
  const router = useRouter();
  const { data } = trpc.user.allInvitations.useQuery().data ?? {};

  const onRedirect = (invitation: string) => {
    const redirectTo = getPrivateRoute("invited", { invitation });
    router.push(redirectTo, { scroll: false });
  };

  return (
    <div className="hover:bg-accent flex flex-col justify-items-start gap-1 rounded-sm px-3 py-2">
      <p className="text-2xs font-medium">{t("title")}</p>
      {!data ? (
        <P className="text-3xs leading-none font-medium">{t("no-invitations")}</P>
      ) : (
        <div className="flex w-full flex-row items-center gap-3 py-1">
          <Box sizes="md" variant="outline">
            <Icon name="invite" className="size-4" />
          </Box>
          <div className="flex w-full flex-col gap-3">
            <p className="text-3xs text-muted-foreground text-pretty">
              {t.rich("invite-message", {
                mark: () => <strong className="text-foreground font-medium">{data?.inviterName as string}</strong>,
                organization: () => (
                  <span className="text-tertiary font-medium">{data?.organizationName as string}</span>
                ),
                role: data.role,
              })}
            </p>
            <Button variant="tertiary" size="sm" className="text-3xs w-fit" onClick={() => onRedirect(data.id)}>
              {t("respond")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
