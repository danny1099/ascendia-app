"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/modules/auth/hooks";
import { getPublicRoute } from "@/routes/utils";
import { MenuContent, DropdownMenu, MenuTrigger, MenuItem, MenuSeparator } from "@/shared/components/dropdown";
import { P, Avatar, Navlink, Icon } from "@/shared/components";
import { useTranslations } from "next-intl";

export const MenuUser = () => {
  const t = useTranslations("users.nabvar");
  const redirectTo = getPublicRoute("sign_in");
  const router = useRouter();
  const { user, logOut } = useAuth();

  return (
    <DropdownMenu>
      <MenuTrigger asChild>
        <Avatar url={user?.image as string} ring />
      </MenuTrigger>
      <MenuContent align="end" sideOffset={10} className="w-68 min-w-56 rounded-md p-2">
        <div className="flex h-fit flex-row gap-3 p-2">
          <Avatar url={user?.image as string} size="md" />
          <div className="flex flex-col items-start">
            <P className="text-accent-foreground text-xs font-medium">{user?.name}</P>
            <span className="text-3xs text-muted-foreground -mt-0.5">{user?.email}</span>
            <Navlink href="/profile" size="sm" icon="arrowRight" className="text-3xs mt-3 h-6 w-fit px-6">
              {t("profile")}
            </Navlink>
          </div>
        </div>
        <MenuSeparator />
        <MenuItem onClick={() => logOut().then(() => router.push(redirectTo))}>
          <span className="flex h-9 flex-row items-center gap-3 px-2">
            <Icon name="logOut" className="text-muted-foreground size-4" />
            <P className="text-2xs">{t("logout")}</P>
          </span>
        </MenuItem>
      </MenuContent>
    </DropdownMenu>
  );
};
