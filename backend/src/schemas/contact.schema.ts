import { z } from "zod";

const requiredText = (label: string, max: number) => z.string()
  .trim()
  .min(1, `${label} is required.`)
  .max(max, `${label} must be ${max} characters or fewer.`);

export const contactRequestSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required.")
    .max(60, "Name must be 60 characters or fewer.")
    .regex(/^[a-zA-Z\s'.-]+$/, "Name can only contain alphabetic letters and spaces."),
  email: z.string().trim().email("A valid email is required.").max(100, "Email must be 100 characters or fewer."),
  phone: z.string().trim().min(7, "Phone number is required."),
  company: requiredText("Company", 100),
  service: requiredText("Service", 100),
  subService: requiredText("Focus area", 150),
  message: requiredText("Project details", 2000),
}).strict();

export type ContactRequest = z.infer<typeof contactRequestSchema>;
