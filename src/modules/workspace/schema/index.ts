import { z } from "zod";

export const workspaceSchema = z.object({
  name: z.string().nonempty({ message: "required" }),
  logo: z.string().optional(),
  type: z.enum(["INDIVIDUAL", "BUSINESS", "ASSESSMENT"], { error: "required" }),
});

export const workspaceWithId = workspaceSchema.extend({
  id: z.string().nonempty({ message: "required" }),
});

export type WorkspaceSchema = z.infer<typeof workspaceSchema>;
export type WorkspaceWithId = z.infer<typeof workspaceWithId>;
