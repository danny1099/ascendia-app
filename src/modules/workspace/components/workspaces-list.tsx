"use client";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { cn, Color } from "@/shared/utils";
import { useTableSelection } from "@/shared/hooks";
import { AnimatedContent, Box, Checkbox, EmptyData, Icon, IconName, SearchBox } from "@/shared/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/table";
import { AddWorkspaceButton, ButtonActions } from "@/modules/workspace/components";
import { columnsNames } from "@/modules/workspace/helpers";
import { trpc } from "@/trpc/client";

/* prettier-ignore */
export const WorkspacesList = () => {
  const [search, setSearch] = useState("");
  const setDebouncedSearch = useDebounceCallback(setSearch, 300);
  const t = useTranslations("workspaces");

  const [workspaces] = trpc.workspace.getAll.useSuspenseQuery();
  const allWorkspaces = workspaces?.data || [];

  /* Filter workspaces by search term */
  const filteredWorkspaces = allWorkspaces.filter(
    (workspace) =>
      workspace.name.toLowerCase().includes(search.toLowerCase()) ||
      workspace.organization?.toLowerCase().includes(search.toLowerCase())
  );

  /* handle table selection functions for table */
  const { isAllSelected, isSelected, toggleAll, toggleRow } = useTableSelection(filteredWorkspaces);

  return (
    <article className="flex size-full flex-col">
      <div className="bg-background mt-3 flex h-fit w-full flex-row items-center">
        <SearchBox placeholder={t("search_box")} onChange={(e) => setDebouncedSearch(e.target.value)} />
        <AddWorkspaceButton className="ml-auto max-sm:hidden md:w-fit" />
      </div>
      <AnimatedContent className="bg-background mt-5 flex size-full flex-col py-4">
        <section className="flex size-full flex-col">
          {filteredWorkspaces.length === 0 ? (
            <EmptyData title={t("no_results.title")} subtitle={t("no_results.subtitle")} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">
                    <Checkbox checked={isAllSelected} onCheckedChange={(checked) => toggleAll(checked === true)} />
                  </TableHead>
                  {columnsNames.map(({ column, style }) => (
                    <TableHead key={column} className={cn("text-foreground", style)}>
                      {/* @ts-ignore */}
                      {t(`table.${column}`)}
                    </TableHead>
                  ))}
                  <TableHead className="w-14" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkspaces.map((workspace) => {
                  return (
                    <TableRow key={workspace.id} data-state={isSelected(workspace.id) && "selected"} className="group hover:text-tertiary hover:bg-accent/80">
                      <TableCell>
                        <Checkbox
                          checked={isSelected(workspace.id)}
                          onCheckedChange={(checked) => toggleRow(workspace.id, checked === true)}
                        />
                      </TableCell>
                      {columnsNames.map(({ column, format, style }) => {
                        const [icon, color] = workspace.logo?.split(":") || [];
                        return (
                          <TableCell key={column} className={cn("text-2xs text-foreground/75", style)}>
                            {column === "name" && (
                              <span className="flex flex-row items-center gap-3">
                                <Box variant={color as Color} sizes="md">
                                  <Icon name={icon as IconName} className="size-4 shrink-0" />
                                </Box>
                                {workspace.name}
                              </span>
                            )}
                            {column !== "name" && format(workspace[column])}
                          </TableCell>
                        );
                      })}
                      <TableCell className="flex w-fit flex-row gap-2">
                        <ButtonActions {...workspace} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </section>
        <AddWorkspaceButton className="mt-auto flex w-full md:hidden" />
      </AnimatedContent>
    </article>
  );
};
