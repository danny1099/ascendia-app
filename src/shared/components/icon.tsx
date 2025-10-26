import { cn } from "@/shared/utils";

interface Props {
  name: IconName;
  className?: string;
}

export const Icon = ({ name, className = "h-4 w-4" }: Props) => {
  return (
    <svg className={cn("bi", className)} fill="currentColor">
      <use xlinkHref={`/images/img-icons-sprite.svg#${iconName[name]}`} />
    </svg>
  );
};

/* prettier-ignore */
export const CardIcon = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("bg-primary shrink-0 text-primary-foreground flex size-7 items-center justify-center rounded-sm", className)}>
      {children}
    </div>
  );
};

export const iconName = {
  add: "plus",
  analysis: "graph-up",
  app: "app-indicator",
  archive: "archive",
  arrowDown: "arrow-down",
  arrowLeft: "arrow-left",
  arrowRight: "arrow-right",
  arrowUp: "arrow-up",
  building: "bank2",
  calendar: "calendar3",
  check: "check2",
  chevronDown: "chevron-down",
  chevronExpand: "chevron-expand",
  chevronLeft: "chevron-left",
  chevronRight: "chevron-right",
  chevronUp: "chevron-up",
  close: "x",
  color: "palette",
  corporate: "buildings",
  currency: "currency-dollar",
  dashboard: "clipboard-data",
  delete: "trash",
  diagram: "diagram-3",
  dot: "dot",
  download: "download",
  edit: "pencil",
  education: "mortarboard",
  email: "envelope",
  eyeClose: "eye-slash",
  eyeOpen: "eye",
  favorite: "heart",
  favoriteFill: "heart-fill",
  file: "file-earmark",
  flag_fill: "flag-fill",
  flag: "flag",
  folder: "folder",
  google: "google",
  home: "house",
  ia: "stars",
  layers: "layers-half",
  learning: "journal-bookmark",
  list: "card-heading",
  loading: "hourglass",
  logOut: "box-arrow-left",
  menu: "list",
  moon: "moon",
  options: "three-dots",
  password: "lock",
  person: "person",
  personal: "person-workspace",
  members: "person-video3",
  refresh: "arrow-clockwise",
  save: "save2",
  search: "search",
  settings: "gear",
  sidebar: "layout-sidebar-reverse",
  square: "square-fill",
  star: "star",
  stats: "graph-up-arrow",
  sun: "sun",
  system: "laptop",
  tag: "bookmark",
  target: "crosshair",
  team: "people",
  translate: "translate",
  upload: "upload",
  warning: "exclamation-triangle",
  workspace: "collection",
};

export type IconName = keyof typeof iconName;
