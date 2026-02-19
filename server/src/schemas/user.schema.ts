import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  accountType: z.enum(["Admin", "Student", "Instructor"]),
  contactNumber: z.string().optional(),
  otp: z.string().length(6),
});

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});
