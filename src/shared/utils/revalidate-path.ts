"use server";
import { revalidatePath } from "next/cache";

export const revalidate = async (path: string) => {
  return await revalidatePath(path);
};
