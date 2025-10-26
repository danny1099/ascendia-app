"use client";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { Icon, IconName } from "@/shared/components/icon";
import { cn } from "@/shared/utils";

/* prettier-ignore */
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    {...props}
    data-slot="switch"
    className={cn('peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',className)}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      data-slot="switch-thumb"
      className={cn('bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0')}/>
  </SwitchPrimitives.Root>
))

/* prettier-ignore */
export const SwitchThumb = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    icon?: IconName;
    thumbClassName?: string;
  }
>(({ className, icon, thumbClassName, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn("peer inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent data-[state=unchecked]:bg-accent", className )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn("pointer-events-none flex h-4 w-4 rounded-full bg-background ring-0 transform transition-transform duration-200 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 items-center justify-center", thumbClassName )}>
      {icon ? <Icon name={icon} className="h-4 w-4" /> : null}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));

/* prettier-ignore */
export const SwitchAnimated = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    icon?: IconName;
    thumbClassName?: string;
  }
>(({ className, icon, thumbClassName, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn("peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-accent data-[state=unchecked]:bg-accent inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50", className )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn("bg-background pointer-events-none flex h-4 w-4 transform items-center justify-center rounded-full ring-0 transition-transform duration-200 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0", thumbClassName)}>
      {icon ? <Icon name={icon} className="h-4 w-4" /> : null}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
