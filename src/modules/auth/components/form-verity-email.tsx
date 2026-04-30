"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getPrivateRoute } from "@/routes/utils";
import { cn, sleep, tryCatch } from "@/shared/utils";
import { Icon, IconName } from "@/shared/components";
import { auth } from "@/modules/auth/client";

interface VerifyEmailProps {
  token: string;
}

/* prettier-ignore */
export const VerityEmailForm = ({ token }: VerifyEmailProps) => {
  const [validateStatus, setValidateStatus] = useState({ type: "verifying", message: "", icon: "" });
  const [currentStep, setCurrentStep] = useState(0);
  const t = useTranslations("verify_email");

  /* get routes to navigate and redirect */
  const router = useRouter();
  const redirectTo = getPrivateRoute("onboarding");

  useEffect(() => {
    if (currentStep >= verificationSteps.length - 1) {
      onVerifyEmail();
    }
  }, [currentStep]);

  useEffect(() => {
    if (validateStatus.type !== "verifying") return;
    const timers = verificationSteps.map((_, index) => {
      return setTimeout(() => {
        setCurrentStep(index);
      }, verificationSteps[index].delay);
    });

    return () => timers.forEach(clearTimeout);
  }, [validateStatus.type]);

  const verificationSteps = [
    { icon: "email", message: t("steps.validating"), delay: 0, type: "verifying" },
    { icon: "shield", message: t("steps.checking"), delay: 200, type: "verifying" },
    { icon: "database", message: t("steps.updating"), delay: 2500, type: "verifying" },
  ];

  const onVerifyEmail = async () => {
    const { error, data } = await tryCatch(auth.verifyEmail({ query: { token } }));

    if (error || data?.error) {
      setValidateStatus({ type: "error", message: t("steps.invalid"), icon: "alert" });
      return;
    }

    setValidateStatus({ type: "success", message: t("steps.completing"), icon: "check" });
    await sleep(1500).then(() => {
      router.push(redirectTo, { scroll: false });
    });
  };

  return (
    <div className="mt-1 inline-flex h-fit w-full items-center justify-center rounded-md transition-colors">
      {validateStatus.type !== "verifying" ? (
        <span className="text-muted-foreground flex h-fit w-auto flex-row items-center justify-center gap-2 rounded-md text-xs">
          <Icon name={validateStatus.icon as IconName} />
          {validateStatus.message}
        </span>
      ) : (
        verificationSteps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = currentStep === 3;

          if (isActive && validateStatus.type === "verifying") {
            return (
              <span key={index} className={cn("text-muted-foreground flex h-fit w-auto animate-pulse flex-row items-center justify-center gap-2 rounded-md text-xs", isCompleted && "text-tertiary/85 animate-none")}>
                <Icon name={step.icon as IconName} className={cn("size-5", isCompleted && "text-tertiary/85")} />
                {step.message}
              </span>
            );
          }
        })
      )}
    </div>
  );
};
