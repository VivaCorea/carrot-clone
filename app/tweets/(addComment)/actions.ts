"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { responseSchema } from "./schema";
import { revalidatePath, revalidateTag } from "next/cache";

export async function uploadResponse(_: any, formData: FormData) {
  const data = {
    payload: formData.get("payload"),
    id: Number(formData.get("tweetId")),
  };

  const result = responseSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();

    try {
      await db.response.create({
        data: {
          payload: result.data.payload,
          userId: session.id!,
          tweetId: result.data.id,
        },
      });
      //revalidateTag(`res-status-${result.data.id}`);
      revalidatePath(`/tweets/${result.data.id}`);
    } catch (e) {}
  }
}
