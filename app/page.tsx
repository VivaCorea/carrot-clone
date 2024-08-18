import TabBar from "@/components/tab-bar";
import TweetList from "@/components/tweet-list";
import { PAGE_AMOUNT } from "@/lib/constants";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
  const products = await db.tweet.findMany({
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
    take: PAGE_AMOUNT,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Tweets() {
  const initialTweets = await getInitialTweets();
  return (
    <>
      <div>
        <TweetList initialTweets={initialTweets} />
      </div>
      <TabBar />
    </>
  );
}
