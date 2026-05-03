"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { useModal } from "@/shared/hooks";
import { cn } from "@/shared/utils";
import { UserFormInvitation } from "@/modules/user/components";

interface Props {
  className?: string;
}

export const InvitationButton = ({ className }: Props) => {
  const { openModal } = useModal();
  const t = useTranslations("users.invitation");

  return (
    <Button
      variant="outline"
      icon="invite"
      onClick={() => {
        openModal({
          title: t("title"),
          description: t("subtitle"),
          content: <UserFormInvitation />,
        });
      }}
      className={cn("mr-3 text-xs max-sm:hidden", className)}
    >
      {t("invite-button")}
    </Button>
  );
};
