import { z } from "zod";

export const userLoginDto = z.object({
  email: z.email(),
  password: z.string().min(2),
});

export const userSignupDto = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
  age: z.number().min(0),
  gender: z.enum(["male", "female"]),
  height: z.number().min(0),
  weight: z.number().min(0),
});
