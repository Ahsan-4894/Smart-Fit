import { z } from "zod";

export const adminLoginDto = z.object({
  email: z.email(),
  password: z.string().min(6),
});
