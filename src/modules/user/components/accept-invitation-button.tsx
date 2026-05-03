"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getPrivateRoute } from "@/routes/utils";
import { useToast } from "@/shared/hooks";
import { tryCatch } from "@/shared/utils";
import { Button } from "@/shared/components";
import type { InvitedUser } from "@/modules/user/types";
import { auth } from "@/modules/auth/client";

interface ManageInvitationButtonProps {
  invitation: InvitedUser;
}

export const ManageInvitationButton = ({ invitation }: ManageInvitationButtonProps) => {
  const t = useTranslations("invitation");
  const toast = useToast();
  const router = useRouter();

  const acceptInvitation = async () => {
    const { data, error } = await tryCatch(
      auth.organization.acceptInvitation({
        invitationId: invitation.id,
      })
    );

    if (data?.error || error) {
      toast({ message: "invitation_accept_error", type: "error" });
      return;
    }
    redirectTo(invitation.organizationSlug as string);
  };

  const declineInvitation = async () => {
    const { data, error } = await tryCatch(
      auth.organization.rejectInvitation({
        invitationId: invitation.id,
      })
    );

    if (data?.error || error) {
      toast({ message: "invitation_decline_error", type: "error" });
      return;
    }
    redirectTo(invitation.activeOrganization as string);
  };

  /* navigate to the private route of new organization */
  const redirectTo = (org: string) => router.push(getPrivateRoute("overview", { organization: org }));

  return (
    <div className="flex w-full flex-col-reverse items-center gap-3 md:w-fit md:flex-row">
      <Button onClick={declineInvitation} variant="outline" className="w-full cursor-pointer md:w-fit">
        {t("decline")}
      </Button>
      <Button onClick={acceptInvitation} className="w-full cursor-pointer md:w-fit">
        {t("accept")}
      </Button>
    </div>
  );
};
