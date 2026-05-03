import { tryCatch } from "@/shared/utils";
import { InviteTemplate } from "@/modules/user/emails";
import { emailProvider } from "@/lib/email";

interface SendInvitationEmailProps {
  email: string;
  inviterName: string;
  invitedEmail: string;
  teamName: string;
  inviteLink: string;
}

export const sendInvitationEmail = async ({
  email,
  inviterName,
  invitedEmail,
  teamName,
  inviteLink,
}: SendInvitationEmailProps) => {
  const { error } = await tryCatch(
    emailProvider.emails.send({
      from: "Ascendia <onboarding@resend.dev>",
      to: email,
      subject: `You've been invited to ${teamName} - Ascendia 🚀`,
      react: InviteTemplate({ email, inviterName, invitedEmail, teamName, inviteLink }),
    })
  );

  if (error) {
    console.log("Error sending email: ", error);
  }
};
