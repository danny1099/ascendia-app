import moment from "moment";
import { capitalize, defineColumns } from "@/shared/utils";
import type { Scenario } from "@/modules/scenario/types";

export const columnsNames = defineColumns<Scenario>({
  name: { style: "w-auto h-fit whitespace-nowrap", format: (name) => String(name) },
  category: { style: "w-fit px-4", format: (category) => capitalize(category as string) },
  createdAt: { style: "w-fit px-4 whitespace-nowrap", format: (date) => moment(date as Date).format("DD-MMM-YYYY") },
});
