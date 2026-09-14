import { z } from "zod";
import { BUDGET_OPTIONS, CONTACT_METHODS, SERVICE_OPTIONS } from "@/lib/constants";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  businessName: z.string().trim().min(2, "Please enter your business name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a phone or WhatsApp number").max(30),
  website: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || /^https?:\/\//i.test(value) || /^[\w.-]+\.[a-z]{2,}/i.test(value),
      "Enter a valid website",
    ),
  service: z.enum(SERVICE_OPTIONS),
  budget: z.enum(BUDGET_OPTIONS),
  message: z.string().trim().min(12, "Tell us a little more about the project").max(4000),
  preferredContact: z.enum(CONTACT_METHODS),
});

export type ContactInput = z.infer<typeof contactSchema>;
