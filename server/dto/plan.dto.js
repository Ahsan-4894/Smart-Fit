import { z } from "zod";

export const addPlanDto = z.object({
  title: z.string().min(3),
  type: z.string().min(3),
  description: z.string().min(3),
  price: z.string().min(0),
  duration: z.string().min(3),
  features: z.string(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  availability: z.string().min(3),
});
