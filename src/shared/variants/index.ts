import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-action text-action-foreground",
        destructive: "text-destructive bg-destructive/10",
        outline: "border border-border bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        tertiary: "bg-tertiary text-tertiary-foreground",
        accent: "bg-accent text-accent-foreground",
        ghost: "bg-transparent border-none text-foreground",
        item: "bg-transparent border-none text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground text-xs font-medium",
        navlink:
          "bg-transparent border-none text-foreground font-medium justify-start [&_svg]:size-4 hover:text-tertiary",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-7 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-7 rounded-sm p-0.5",
        xs: "size-5 rounded-sm p-0.5",
        tiny: "size-2.5 rounded-sm p-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-2xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const buttonGroupVariants = cva(
  "has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md flex w-fit items-stretch *:focus-visible:z-10 *:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-md! [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-md! flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export const inputVariants = cva("w-80 flex items-center gap-1 px-2 rounded-lg autofill:bg-transparent", {
  variants: {
    variant: {
      ghost: "bg-transparent text-foreground",
      outline: "border border-input bg-background text-foreground",
      accent: "bg-accent text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground",
    },
    sizes: {
      sm: "h-8",
      md: "h-9",
      lg: "h-11",
    },
  },
  defaultVariants: {
    variant: "outline",
    sizes: "md",
  },
});

export const sheetVariants = cva(
  "fixed z-50 gap-2 bg-background flex flex-col p-2 shadow-sm transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 flex-col flex h-full w-80 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left max-sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-80 flex-col flex data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right max-sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export const sheetContainerVariants = cva(
  "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      container: {
        black: "bg-black/90",
        white: "bg-white/10",
        gray: "bg-gray-300/80",
      },
    },
    defaultVariants: {
      container: "black",
    },
  }
);

export const dividerVariants = cva("shrink-0 block", {
  variants: {
    type: {
      vertical: "w-[1px] h-10 border-r border-border",
      horizontal: "h-[1px] w-10 border-t border-border",
    },
  },
  defaultVariants: {
    type: "vertical",
  },
});

export const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-4 bg-transparent",
      },
      border: {
        line: "border-b border-border pb-3 group-data-[variant=line]/tabs-trigger:border-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 bg-background",
        rounded: "border rounded-lg border-border",
      },
    },
    defaultVariants: {
      variant: "default",
      border: "line",
    },
  }
);
