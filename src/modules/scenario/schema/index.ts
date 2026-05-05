import { z } from "zod";

export const scenarioSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  slug: z.string().min(1, { message: "required" }),
  description: z.string().min(1, { message: "required" }),
  category: z.enum(["SUPPLY_CHAIN", "MARKETING", "OUTSOURCING", "CUSTOM"]),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]),
  maxPlayers: z.number({ message: "required" }),
  totalRounds: z.number({ message: "required" }),
  isTemplate: z.boolean({ message: "required" }),
});

export const scenarioSchemaWithId = scenarioSchema.extend({ id: z.string() });

export type ScenarioSchema = z.infer<typeof scenarioSchema>;
export type ScenarioWithIdSchema = z.infer<typeof scenarioSchemaWithId>;
