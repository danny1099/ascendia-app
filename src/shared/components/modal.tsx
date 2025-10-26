"use client";
import { useState } from "react";
import { useIsMobile } from "@/shared/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/drawer";

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  trigger: React.ReactNode;
}

/* prettier-ignore */
export const Modal = ({ children, title, description, trigger }: Props) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (!isMobile) {  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent>
          {title && (
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription className="-mt-1.5">{description}</DialogDescription>}
            </DialogHeader>
          )}
          <div className="p-1 size-fit">{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        {title && (
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
        )}
        <div className="h-fit py-2 px-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
