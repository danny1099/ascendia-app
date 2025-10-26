import { Message } from "next-intl";

declare global {
  interface TRPCResponse<T> {
    result: T | null;
    message: Message | null;
    status: "success" | "error";
  }
}

export {};
