import { object, z } from "zod";

export enum Audience {
  children = "children",
  adults = "adults",
  all = "all",
}

export enum DurationUnit {
  hours = "hours",
  days = "days",
  weeks = "weeks",
  months = "months",
  years = "years",
}

export const classProgramFormSchema = z.object({
  subject: z.string(),
  objective: z.string(),
  targetAudience: z.nativeEnum(Audience),
  duration: z.coerce.number(),
  durationUnit: z.nativeEnum(DurationUnit),
  notes: z.string().optional(),
});

export const classProgramResponseSchema = z.object({
  intro: z.string().describe("A brief introduction to the class program."),
  goals: z.array(z.string()).describe("The goals of the class program."),
  structure: z
    .array(
      z.object({
        title: z.string().describe("The title of the section."),
        description: z.string().describe("The description of the section."),
        subSections: z
          .array(
            z.object({
              title: z.string().describe("The title of the subsection."),
              description: z
                .string()
                .describe("The description of the subsection."),
            })
          )
          .describe("Subsections of the section if necesesary.")
          .optional(),
      })
    )
    .describe("The structure of the class program."),
});
