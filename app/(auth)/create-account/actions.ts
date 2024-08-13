"use server";

import { redirect } from "next/navigation";
import getSession from "@/lib/session";

import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LEN,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
const passwordRegex = PASSWORD_REGEX;
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

/* const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueUserEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
}; */

const formScheme = z
  .object({
    username: z
      .string({
        invalid_type_error: "type!! is not string",
        required_error: "name is required",
      })
      .toLowerCase()
      .trim(),
    //.refine(checkUniqueUsername, "This username is already taken."),
    //.transform((username) => `!!${username}!!`)
    //.refine(chkUserName, "no 감자 allowed"),
    email: z.string().email().toLowerCase(),
    /* .refine(
        checkUniqueUserEmail,
        "there is an account already registered with that email."
      ), */
    password: z
      .string()
      .min(PASSWORD_MIN_LEN)
      .regex(passwordRegex, PASSWORD_REGEX_ERR),
    confirm_password: z.string().min(PASSWORD_MIN_LEN),
  })
  .refine(chkPasswords, {
    message: "Both password should be same~",
    path: ["confirm_password"],
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
export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  /* try {
    formScheme.parse(data);
  } catch (e) {
    console.log(e);
  } */

  const rst = await formScheme.spa(data);
  if (!rst.success) {
    return rst.error.flatten();
  } else {
    /* const user = await db.user.findUnique({
      where: {
        username: rst.data.username,
      },
      select: {
        id: true,
      },
    });
    const userEmail = await db.user.findUnique({
      where: {
        email: rst.data.email,
      },
      select: {
        id: true,
      },
    }); */
    const hashedPassword = await bcrypt.hash(rst.data.password, 12);
    const user = await db.user.create({
      data: {
        username: rst.data.username,
        email: rst.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}
