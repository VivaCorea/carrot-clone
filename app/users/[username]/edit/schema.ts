import {
  PASSWORD_MIN_LEN,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  bio: z.string(),
  email: z.string().email(),
});
export const formScheme = z
  .object({
    username: z
      .string({
        invalid_type_error: "type!! is not string",
        required_error: "name is required",
      })
      .toLowerCase()
      .trim(),
    email: z.string().email().toLowerCase(),
    bio: z.string(),
    password: z
      .string()
      .min(PASSWORD_MIN_LEN)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERR),
  })
  .superRefine(async ({ username }, context) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      context.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, context) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      context.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });
