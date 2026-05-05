"use client";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { capitalize, cn } from "@/shared/utils";
import { useTableSelection } from "@/shared/hooks";
import { AnimatedContent, SearchBox, EmptyData, Badge, Checkbox } from "@/shared/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/table";
import { AddScenarioButton } from "@/modules/scenario/components";
import { columnsNames } from "@/modules/scenario/helpers";
import { trpc } from "@/trpc/client";

/* prettier-ignore */
export const ScenarioList = () => {
  const [search, setSearch] = useState("");
  const setDebouncedSearch = useDebounceCallback(setSearch, 300);
  const t = useTranslations("scenarios");

  const [scenarios] = trpc.scenario.getAll.useSuspenseQuery();
  const allScenarios = scenarios.data || [];
  const filteredScenarios = allScenarios.filter((scenario) =>
    scenario.name.toLowerCase().includes(search.toLowerCase())
  );

  /* handle table selection functions for table */
  const { isAllSelected, isSelected, toggleAll, toggleRow } = useTableSelection(filteredScenarios);

  return (
    <article className="flex size-full flex-col">
      <div className="bg-background mt-3 flex h-fit w-full flex-row items-center">
        <SearchBox placeholder={t("search_box")} onChange={(e) => setDebouncedSearch(e.target.value)} />
        <AddScenarioButton className="ml-auto max-sm:hidden md:w-fit" />
      </div>
      <AnimatedContent className="bg-background mt-5 flex size-full flex-col py-4">
        <section className="flex size-full flex-col">
          {filteredScenarios.length === 0 ? (
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
                  <TableHead className="w-fit" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScenarios.map((scenario) => {
                  return (
                    <TableRow key={scenario.id} data-state={isSelected(scenario.id) && "selected"} className="group hover:text-tertiary hover:bg-accent/80">
                      <TableCell>
                        <Checkbox
                          checked={isSelected(scenario.id)}
                          onCheckedChange={(checked) => toggleRow(scenario.id, checked === true)}
                        />
                      </TableCell>
                      {columnsNames.map(({ column, format, style }) => {
                        return (
                          <TableCell key={column} className={cn("text-2xs text-foreground/75 h-14", style)}>
                            {column === "name" && (
                              <div className="flex flex-col items-start truncate">
                                <span className="flex flex-row items-center">
                                  <p className="text-2xs font-medium">{scenario.name}</p>
                                  <Badge variant="outline" className="text-3xs ml-5">
                                    {capitalize(scenario.difficulty)}
                                  </Badge>
                                </span>
                                <span className="text-muted-foreground text-3xs mt-0.5 line-clamp-2 w-full text-wrap">
                                  {scenario.description}
                                </span>
                              </div>
                            )}
                            {column !== "name" && format(scenario[column])}
                          </TableCell>
                        );
                      })}
                      <TableCell className="flex w-14 flex-row gap-2">{/* <ButtonActions {...org} /> */}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </section>
        <AddScenarioButton className="mt-auto flex w-full md:hidden" />
      </AnimatedContent>
    </article>
  );
};
