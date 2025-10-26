import { toast as Sonner } from "sonner";
import { useTranslations } from "next-intl";
import { Icon, IconName } from "@/shared/components";
import { cn } from "@/shared/utils";

export type ToastType = "success" | "error" | "warning" | "info" | "loading";

const toastType = {
  success: { icon: "check" as IconName, className: "bg-green-100 text-green-900" },
  error: { icon: "close" as IconName, className: "bg-red-100 text-red-900" },
  warning: { icon: "warning" as IconName, className: "bg-amber-100 text-amber-900" },
  info: { icon: "info" as IconName, className: "bg-blue-100 text-blue-900" },
  loading: { icon: "refresh" as IconName, className: "bg-violet-100 text-violet-900 animate-spin" },
};

/* prettier-ignore */
export const useToast = () => {
  const t = useTranslations("messages");

  return (message: string, type: ToastType = "success") => {
    Sonner("LeadEdge AI", {
      /* @ts-ignore */
      description: t(`${message}`) || "LeadEdge AI notification message",
      dismissible: true,
      classNames: {
        title: "font-medium ml-2 text-xs",
        description: "text-foreground-muted text-2xs ml-2 -mt-1",
      },
      icon: (
        <div className={cn("flex size-7 items-center justify-center rounded-full", toastType[type].className)}>
          <Icon name={toastType[type].icon} className="size-4" />
        </div>
      ),
    });
  };
};
