"use client";
import { UserRole } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { getPrivateRoute } from "@/routes/utils";
import { useAuth } from "@/modules/auth/hooks";
import { type IconName, AnimatedContent, Divider } from "@/shared/components";
import { Back, MenuAccountSwitcher, MenuGroup, MenuHeader, MenuLink, MenuSkeleton } from "@/modules/private/components";
import { menuItems, menuSegments, type MenuView } from "@/modules/private/helpers";

export const Menu = () => {
  const t = useTranslations("menu");
  const { organization, workspace } = useParams<{ organization: string; workspace: string }>();
  const { user, isPending } = useAuth();

  /* determine menu type based on user role and workspace availability */
  const menuView: MenuView = workspace ? "hub" : "admin";

  /* should not render menu if user role is not defined or is pending */
  if (!user?.role || isPending) return <MenuSkeleton />;

  const role = user.role as UserRole;
  const segments = menuSegments[role] ?? [];
  const items = menuItems[role] ?? [];

  return (
    <div className="border-muted flex size-full flex-col border-r transition-all duration-300">
      <MenuHeader />
      <AnimatedContent key={`${organization}:${role}`} className="relative flex size-full flex-col px-4 py-4 md:px-12">
        {segments
          .filter((s) => s.view.includes(menuView))
          .map(({ group, title, styles, child }) =>
            group !== "component" ? (
              <MenuGroup key={group} title={title} className={styles}>
                <ul className="relative w-full space-y-2">
                  <Back className={menuView === "admin" ? "hidden" : "block"} />
                  {items
                    .filter((i) => i.view === menuView)
                    .filter((i) => i.place === group)
                    .map(({ name, path, icon, render }) => {
                      const redirectTo = getPrivateRoute(path, { organization, workspace });
                      if (render === "divider")
                        return <Divider key={name} type="horizontal" className="bg-border-muted w-full" />;

                      return (
                        <li key={name}>
                          <MenuLink route={redirectTo} icon={icon as IconName}>
                            {/* @ts-ignore */}
                            {t(`items.${name}`)}
                          </MenuLink>
                        </li>
                      );
                    })}
                </ul>
              </MenuGroup>
            ) : (
              <MenuGroup key={group} className={styles}>
                {child}
              </MenuGroup>
            )
          )}
        <MenuAccountSwitcher className="mt-auto" />
      </AnimatedContent>
    </div>
  );
};
