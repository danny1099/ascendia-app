import { tryCatch } from "@/shared/utils";
import { VerifyEmail, ResetPassword } from "@/modules/auth/emails";
import { emailProvider } from "@/lib/email";

interface SendEmailProps {
  email: string;
  token: string;
}

export const sendEmailVerification = async ({ email, token }: SendEmailProps) => {
  const { error } = await tryCatch(
    emailProvider.emails.send({
      from: "Ascendia <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Ascendia — Your leadership journey starts here",
      react: VerifyEmail({ token }),
    })
  );

  if (error) {
    console.log("Error sending email: ", error);
  }
};

export const sendEmailResetPassword = async ({ email, token }: SendEmailProps) => {
  const { error } = await tryCatch(
    emailProvider.emails.send({
      from: "Ascendia <onboarding@resend.dev>",
      to: email,
      subject: "Your verification code is ready",
      react: ResetPassword({ token }),
    })
  );

  if (error) {
    console.log("Error sending email: ", error);
  }
};
