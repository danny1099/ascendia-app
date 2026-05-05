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
    {
      name: "scenarios",
      path: "scenarios",
      render: "link",
      place: "platform",
      icon: "layers",
      view: "admin",
    },
    {
      name: "dashboard",
      path: "dashboard",
      render: "link",
      place: "main",
      icon: "report",
      view: "hub",
    },
    {
      name: "simulations",
      path: "simulations",
      render: "link",
      place: "main",
      icon: "puzzle",
      view: "hub",
    },
  ],
  admin: [],
  member: [],
};
