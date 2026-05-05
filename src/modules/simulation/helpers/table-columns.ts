import moment from "moment";
import { capitalize, defineColumns } from "@/shared/utils";
import type { Simulation } from "@/modules/simulation/types";

export const columnsNames = defineColumns<Simulation>({
  name: { style: "w-auto h-fit whitespace-nowrap", format: (name) => String(name) },
  status: { style: "w-fit px-4", format: (status) => capitalize(status as string) },
  createdAt: { style: "w-fit px-4 whitespace-nowrap", format: (date) => moment(date as Date).format("DD-MMM-YYYY") },
});
