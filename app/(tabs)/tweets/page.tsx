import db from "@/lib/db";
import ListTweet from "@/components/list-tweet";

async function getTweets() {
  const products = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      id: true,
    },
  });
  return products;
}

export default async function Tweets() {
  const tweets = await getTweets();
  return (
    <div className="p-5 flex flex-col gap-5">
      {tweets.map((item) => (
        <ListTweet key={item.id} {...item} />
      ))}
    </div>
  );
}
