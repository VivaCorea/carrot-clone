"use server";
import {
  PASSWORD_MIN_LEN,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERR,
} from "@/lib/constants";
import { z } from "zod";
const passwordRegex = PASSWORD_REGEX;
//const usernameScheme = z.string().min(5).max(PASSWORD_MIN_LEN);
const chkUserName = (name: string) => {
  return !name.includes("potato");
};

const chkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formScheme = z
  .object({
    userName: z
      .string({
        invalid_type_error: "type!! is not string",
        required_error: "name is required",
      })
      .toLowerCase()
      .trim()
      .transform((username) => `!!${username}!!`)
      .refine(chkUserName, "no 감자 allowed"),
    email: z.string().email(),
    password: z
      .string()
      .min(PASSWORD_MIN_LEN)
      .regex(passwordRegex, PASSWORD_REGEX_ERR),
    confirm_password: z.string().min(PASSWORD_MIN_LEN),
  })
  .refine(chkPasswords, {
    message: "Both password should be same~",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  /* try {
    formScheme.parse(data);
  } catch (e) {
    console.log(e);
  } */

  const rst = formScheme.safeParse(data);
  if (!rst.success) {
    return rst.error.flatten();
  } else {
  }
}
