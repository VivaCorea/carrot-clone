"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { formScheme, userSchema } from "./schema";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";

export async function getUser() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
  });
  return user;
}

export async function _updateUser(_: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    bio: formData.get("bio"),
  };

  const rst = await formScheme.spa(data);
  //const rst = await userSchema.safeParse(data);

  if (!rst.success) {
    return rst.error.flatten();
  } else {
    try {
      const session = await getSession();
      const hashedPassword = await bcrypt.hash(rst.data.password, 12);
      const user = await db.user.update({
        where: {
          id: session?.id,
        },
        data: {
          username: rst.data.username,
          email: rst.data.email,
          bio: rst.data.bio,
          password: hashedPassword,
        },
        select: {
          id: true,
        },
      });
      revalidatePath(`/users/${rst.data.username}/edit`);
    } catch (e) {}

    redirect(`/users/${rst.data.username}`);
  }
}
