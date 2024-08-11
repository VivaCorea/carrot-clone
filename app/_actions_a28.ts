"use server";
import { z } from "zod";
const PASSWORD = "12345";
const emailSchema = z
  .string()
  .email()
  .refine(
    (email) => {
      return email.endsWith("@zod.com");
    },
    {
      message: "이메일은 @zod.com 도메인으로 끝나야 합니다.",
    }
  );

const usernameSchema = z.string().min(5, {
  message: "username은 최소 5글자 이상이어야 합니다.",
});

const passwordSchema = z
  .string()
  .min(10, {
    message: "비밀번호는 최소 10글자 이상이어야 합니다.",
  })
  .refine(
    (password) => {
      return /\d/.test(password);
    },
    {
      message: "비밀번호에는 최소 1개 이상의 숫자가 포함되어야 합니다.",
    }
  );

const userSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
});
export const login = async (prevState: any, formData: FormData) => {
  const password = formData.get("password");

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const rst = userSchema.safeParse(data);
  if (rst.success) {
    if (PASSWORD === data.password) {
      return { OK: true };
    } else {
      return {
        errors: ["wrong password."],
      };
    }
  } else {
    return rst.error.flatten();
  }
};
