import moment from "moment";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPrivateRoute } from "@/routes/utils";
import { P, Navbar, AnimatedContent, Avatar, AvatarGroup, AvatarGroupCount } from "@/shared/components";
import { ManageInvitationButton } from "@/modules/user/components";
import { isAuthenticated } from "@/modules/auth/session";
import { trpc } from "@/trpc/server";

interface InvitationsProps {
  params: Promise<{ invitation: string }>;
}

export default async function Invitations({ params }: InvitationsProps) {
  const { invitation } = await params;
  const { organization } = await isAuthenticated();
  const { data } = await trpc.user.getInvitation({ param: invitation });

  /* translations and redirect route */
  const t = await getTranslations("invitation");
  const redirectTo = getPrivateRoute("overview", { organization: organization as string });

  /* redirect to overview if invitation already accepted */
  if (!data) redirect(redirectTo);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar />
      <main className="bg-background flex size-full flex-col items-center gap-2 px-4 py-6 md:px-24">
        <AnimatedContent className="mt-10 flex h-full w-full flex-col items-center justify-center md:w-120">
          <Avatar url={data?.inviterAvatar} size="lg" />
          <span className="text-foreground mt-3 flex w-full flex-col items-center text-sm">
            <p>
              {t.rich("invite-message", {
                mark: () => <strong className="font-medium">{data?.inviterName as string}</strong>,
              })}
            </p>
            <p>
              {t.rich("join-to", {
                role: data?.role as string,
                strong: () => <span className="text-tertiary font-semibold">{data?.organizationName}</span>,
              })}
            </p>
          </span>
          <div className="bg-accent mt-5 flex h-fit w-full flex-col items-center rounded-md p-2 text-center">
            <P className="text-2xs line-clamp-2">{t("description")}</P>
            <span className="mt-2 flex w-full flex-row items-center justify-center gap-2">
              <AvatarGroup>
                {data.members?.slice(0, 5).map((member) => (
                  <Avatar key={member.id} url={member.image as string} size="sm" />
                ))}
                <AvatarGroupCount>{data?.members?.length}</AvatarGroupCount>
              </AvatarGroup>
              <P className="text-2xs text-foreground">{t("members", { count: data?.members?.length ?? 0 })}</P>
            </span>
          </div>
          <div className="mt-20 flex w-full flex-col-reverse items-center text-center md:mt-10 md:flex-row md:justify-between">
            <P className="text-2xs">{t("expiry", { time: moment(data?.expiresAt).fromNow(true) })}</P>
            <ManageInvitationButton invitation={data} />
          </div>
        </AnimatedContent>
      </main>
    </div>
  );
}

export const metadata = {
  title: "You’ve been invited to an organization",
  description:
    "You have been invited to an organization to collaborate, explore ideas, and build something meaningful together.",
};
