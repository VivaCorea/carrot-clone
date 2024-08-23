"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getUsers() {
  const users = await db.user.findMany({
    select: {
      avatar: true,
      username: true,
      created_at: true,
      id: true,
      email: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return users;
}
export type Users = Prisma.PromiseReturnType<typeof getUsers>;
