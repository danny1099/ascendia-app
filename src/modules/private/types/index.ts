import type { PrivateRoute } from "@/routes/types";
import type { IconName } from "@/shared/components";

export interface Item {
  name: string;
  path: PrivateRoute;
  icon?: IconName;
}

export type MenuView = "admin" | "hub";

export interface MenuItem extends Item {
  render: "link" | "divider" | "group";
  subitems?: Item[];
  place: "main" | "platform";
  view: MenuView;
}

export interface Segment {
  group: "main" | "platform" | "component";
  title?: string;
  styles: string;
  child?: React.ReactNode;
  view: MenuView[];
}
