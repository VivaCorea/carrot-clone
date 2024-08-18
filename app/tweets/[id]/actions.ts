"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function likeTweet(tweet_id: number) {
  //await new Promise((r) => setTimeout(r, 10000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweet_id,
        user_id: session.id!,
      },
    });
    revalidateTag(`like-status-${tweet_id}`);
  } catch (e) {}
}

export async function dislikeTweet(tweet_id: number) {
  //await new Promise((r) => setTimeout(r, 10000));
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweet_id,
          user_id: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweet_id}`);
  } catch (e) {}
}
