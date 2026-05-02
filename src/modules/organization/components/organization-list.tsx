"use client";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { cn, Color } from "@/shared/utils";
import { AnimatedContent, Icon, IconName, SearchBox, EmptyData } from "@/shared/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/table";
import { AddOrganizationButton, ButtonActions, OrganizationLogo } from "@/modules/organization/components";
import { columnsNames } from "@/modules/organization/helpers";
import { trpc } from "@/trpc/client";

export const OrganizationList = () => {
  const [search, setSearch] = useState("");
  const setDebouncedSearch = useDebounceCallback(setSearch, 300);
  const t = useTranslations("organization");

  const [organizations] = trpc.organization.getAll.useSuspenseQuery();
  const allOrganizations = organizations?.data || [];
  const filteredOrganizations = allOrganizations.filter((org) => org.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <article className="flex size-full flex-col">
      <div className="bg-background mt-3 flex h-fit w-full flex-row items-center">
        <SearchBox placeholder={t("search_box")} onChange={(e) => setDebouncedSearch(e.target.value)} />
        <AddOrganizationButton className="ml-auto max-sm:hidden md:w-fit" />
      </div>
      <AnimatedContent className="bg-background mt-5 flex size-full flex-col py-4">
        <section className="flex size-full flex-col">
          {filteredOrganizations.length === 0 ? (
            <EmptyData title={t("no_results.title")} subtitle={t("no_results.subtitle")} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {columnsNames.map(({ column, style }) => (
                    <TableHead key={column} className={cn("text-foreground", style)}>
                      {/* @ts-ignore */}
                      {t(`table.${column}`)}
                    </TableHead>
                  ))}
                  <TableHead className="w-fit" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizations
                  .sort((a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0))
                  .map((organization) => {
                    const { isActive, members, ...org } = organization;
                    return (
                      <TableRow key={org.id} className="group hover:text-tertiary hover:bg-accent/60">
                        {columnsNames.map(({ column, format, style }) => {
                          const [name, color] = org.logo?.split(":") || [];
                          return (
                            <TableCell key={column} className={cn("text-2xs text-foreground/75", style)}>
                              {column === "name" && (
                                <span className="flex flex-row items-center gap-3">
                                  <OrganizationLogo url={org.logo as string} />
                                  {org.name}
                                </span>
                              )}
                              {column !== "name" && format(organization[column])}
                            </TableCell>
                          );
                        })}
                        <TableCell className="flex w-14 flex-row gap-2">
                          <ButtonActions {...org} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </section>
        <AddOrganizationButton className="mt-auto flex w-full md:hidden" />
      </AnimatedContent>
    </article>
  );
};
