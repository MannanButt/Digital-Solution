import { z } from "zod";

const requiredText = (label: string, max: number) => z.string()
  .trim()
  .min(1, `${label} is required.`)
  .max(max, `${label} must be ${max} characters or fewer.`);

export const contactRequestSchema = z.object({
  name: requiredText("Name", 100),
  email: z.email("A valid email is required.").trim().max(254),
  phone: z.string().trim().regex(/^\d{7,15}$/, "Phone must contain 7 to 15 digits."),
  company: requiredText("Company", 150),
  service: requiredText("Service", 100),
  subService: requiredText("Focus area", 150),
  message: requiredText("Project details", 5_000),
}).strict();

export type ContactRequest = z.infer<typeof contactRequestSchema>;
