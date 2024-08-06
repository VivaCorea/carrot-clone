"use server";
import { z } from "zod";
const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);
//const usernameScheme = z.string().min(5).max(10);
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
      .min(3, "Way tto short!")
      .max(10, "That is Too Loooooong")
      .toLowerCase()
      .trim()
      .transform((username) => `!!${username}!!`)
      .refine(chkUserName, "no 감자 allowed"),
    email: z.string().email(),
    password: z
      .string()
      .min(10)
      .regex(
        passwordRegex,
        "a password must have lowercase, uppercase a number and special characters."
      ),
    confirm_password: z.string().min(10),
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
