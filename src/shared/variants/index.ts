import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground border border-border [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
      bordered: {
        default: "border border-border",
        primary: "border border-primary",
        secondary: "border border-secondary",
        destructive: "border border-destructive",
        accent: "border border-accent",
      },
    },
    defaultVariants: {
      variant: "default",
      bordered: "default",
    },
  }
);

export const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary/90 text-primary-foreground",
        destructive: "bg-destructive/80 text-white focus-visible:ring-destructive/20",
        outline: "border border-border bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        ghost: "bg-transparent border-none text-foreground",
        gradient: "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white",
        link: "text-foreground text-xs font-medium",
        "in-line": "bg-transparent cursor-pointer text-foreground hover:bg-accent",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-7 rounded-sm p-0.5",
        tiny: "size-5 rounded-sm p-0.5",
      },
      align: {
        start: "justify-start text-left",
        center: "justify-center text-center",
        end: "justify-end text-right",
      },
      bordered: {
        default: "border border-border",
        primary: "border border-primary",
        secondary: "border border-secondary",
        destructive: "border border-destructive",
        accent: "border border-accent",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      bordered: "default",
    },
  }
);

export const inputVariants = cva("w-80 flex items-center gap-1 px-2 rounded-md autofill:bg-transparent", {
  variants: {
    variant: {
      ghost: "bg-transparent text-foreground",
      outline: "border border-input bg-background text-foreground",
      accent: "bg-accent text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground",
    },
    sizes: {
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
    },
  },
  defaultVariants: {
    variant: "outline",
    sizes: "md",
  },
});

export const avatarVariants = cva(
  "relative inline-flex items-center justify-center bg-secondary text-secondary-foreground ring-offset-1 transition-colors ring-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        rounded: "rounded-full",
        squared: "rounded-md",
      },
      size: {
        md: "h-8 w-8",
        sm: "h-5 w-5",
        lg: "h-10 w-10",
      },
      ring: {
        white: "ring-white",
        black: "ring-black",
        blue: "ring-blue-500",
        red: "ring-red-500",
        green: "ring-green-500",
        yellow: "ring-yellow-500",
        purple: "ring-purple-500",
        pink: "ring-pink-500",
        gray: "bg-gray-400",
      },
    },
    defaultVariants: {
      variant: "rounded",
      size: "md",
      ring: "white",
    },
  }
);

export const dotVariants = cva("h-1.5 w-1.5 rounded-full", {
  variants: {
    radius: {
      full: "rounded-full",
      md: "rounded-md",
      sm: "rounded-sm",
    },
    size: {
      md: "h-3 w-3",
      sm: "h-2 w-2",
      lg: "h-5 w-5",
    },
    color: {
      white: "bg-white",
      black: "bg-black",
      blue: "bg-blue-500",
      red: "bg-red-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      purple: "bg-purple-500",
      pink: "bg-pink-500",
      gray: "bg-gray-400",
    },
  },
  defaultVariants: {
    radius: "full",
    size: "sm",
    color: "black",
  },
});

export const sheetVariants = cva(
  "fixed z-50 gap-2 bg-background flex flex-col p-2 shadow-sm transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
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

export const dividerVariants = cva("bg-border", {
  variants: {
    type: {
      vertical: "w-[1px] h-full",
      horizontal: "h-[1px] w-full",
    },
  },
  defaultVariants: {
    type: "vertical",
  },
});
