import moment from "moment";
import type { OrganizationWithMembers } from "@/modules/organization/types";
import { capitalize, defineColumns } from "@/shared/utils";

export const columnsNames = defineColumns<OrganizationWithMembers>({
  name: { style: "w-120", format: (name) => String(name) },
  role: { style: "w-20", format: (role) => capitalize(role as string) },
  members: { style: "w-30 text-center", format: (members) => String(members) },
  createdAt: { style: "w-fit whitespace-nowrap", format: (date) => moment(date as Date).format("DD-MMM-YYYY") },
});
