import moment from "moment";
import type { User } from "@/modules/user/types";
import { capitalize, defineColumns } from "@/shared/utils";

export const columnsNames = defineColumns<User>({
  name: { style: "w-80", format: (name) => name as string },
  email: { style: "w-auto", format: (email) => email as string },
  role: { style: "w-auto", format: (role) => capitalize(role as string) },
  status: { style: "w-auto", format: (status) => capitalize(status as string) },
  createdAt: { style: "w-auto", format: (date) => moment(date as Date).format("DD-MMM-YYYY") },
});
