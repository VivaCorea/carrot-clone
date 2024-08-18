"use server";

import { PAGE_AMOUNT } from "@/lib/constants";
import db from "@/lib/db";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      id: true,
      _count: {
        select: {
          response: true,
          likes: true,
        },
      },
    },
    skip: PAGE_AMOUNT * page,
    take: PAGE_AMOUNT,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export async function getTweetLastPage() {
  const tweetsLen = await db.tweet.count();
  return Math.round(tweetsLen / PAGE_AMOUNT);
}
