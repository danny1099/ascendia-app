import type { UserRole } from "@prisma/client";
import type { MenuItem, Segment } from "@/modules/private/types";

export type MenuView = "admin" | "hub";

export const menuSegments: Record<UserRole, Segment[]> = {
  owner: [
    {
      group: "main",
      styles: "mt-5",
      view: ["admin", "hub"],
    },
    {
      group: "platform",
      styles: "mt-10",
      title: "Platform",
      view: ["admin"],
    },
  ],
  admin: [],
  member: [],
};

export const menuItems: Record<UserRole, MenuItem[]> = {
  owner: [
    {
      name: "overview",
      path: "overview",
      render: "link",
      place: "main",
      icon: "screen",
      view: "admin",
    },
    {
      name: "organization",
      path: "organizations",
      render: "link",
      place: "main",
      icon: "company",
      view: "admin",
    },
    {
      name: "workspaces",
      path: "workspaces",
      render: "link",
      place: "main",
      icon: "collection",
      view: "admin",
    },
    {
      name: "users",
      path: "users",
      render: "link",
      place: "platform",
      icon: "people",
      view: "admin",
    },
  ],
  admin: [],
  member: [],
};
