"use server";
import { z } from "zod";

const usernameScheme = z.string().min(5).max(10);

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  usernameScheme.parse(data.userName);
}
