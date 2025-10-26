"use client";
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { inputVariants } from "@/shared/variants";
import { Icon } from "@/shared/components/icon";
import { cn } from "@/shared/utils";

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  place?: "start" | "end";
  isBordered?: boolean;
}

/* prettier-ignore */
export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, variant, sizes,  place = 'end', isBordered = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState('password')

    return (
      <div className={cn(inputVariants({ variant, sizes }), place === 'start' ? 'flex-row-reverse' : 'flex-row gap-3', isBordered && 'border border-input', className)}>
        <input
          {...props}
          ref={ref}
          type={showPassword}
          autoComplete='new-password'
          className={cn("bg-transparent flex h-10 w-full px-1.5 text-xs outline-none placeholder:text-foreground-muted autofill:bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-70")}
        />
        <button 
          type="button" 
          className="flex h-full w-6 items-center justify-center bg-transparent" 
          onClick={() => setShowPassword(showPassword === 'password' ? 'text' : 'password')}
        >
          <Icon name={showPassword === 'password' ? "eyeClose" : "eyeOpen"} className="size-4" />
        </button>
      </div>
    )
  }
)
