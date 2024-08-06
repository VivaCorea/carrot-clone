"use server";

import {
  PASSWORD_MIN_LEN,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERR,
} from "@/lib/constants";
import { z } from "zod";

const formScheme = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string({ required_error: "password is required." })
    .min(PASSWORD_MIN_LEN)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERR),
});
export const smsVerification = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = formScheme.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
  }
};
