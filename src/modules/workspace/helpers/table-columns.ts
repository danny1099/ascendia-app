import type { Workspace } from "@/modules/workspace/types";
import { capitalize, defineColumns } from "@/shared/utils";
import moment from "moment";

export const columnsNames = defineColumns<Workspace>({
  name: { style: "w-1/2", format: (name) => String(name) },
  type: { style: "w-auto", format: (type) => capitalize(type as string) },
  createdAt: { style: "w-auto", format: (date) => moment(date as Date).format("DD-MMM-YYYY") },
});
