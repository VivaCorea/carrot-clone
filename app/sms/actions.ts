"use server";
import validator from "validator";
import { z } from "zod";

const phoneScheme = z.string().trim().refine(validator.isMobilePhone);
const tokenScheme = z.coerce.number().min(100000).max(999999);

export const smsLogin = async (prevState: any, formData: FormData) => {
  const token = formData.get("token");
  tokenScheme.parse(token);
};
