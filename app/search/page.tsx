import ListTweet from "@/components/list-tweet";
import db from "@/lib/db";

interface SearchProps {
  searchParams?: SearchParams;
}
interface SearchParams {
  keywords?: string;
}

async function getTweetsFromKeywords(keywords: string) {
  const tweets = await db.tweet.findMany({
    where: {
      tweet: {
        contains: keywords,
        //mode: "insensitive",
      },
    },
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
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export default async function Search({ searchParams }: SearchProps) {
  const keywords = searchParams?.keywords || "";
  const tweets = await getTweetsFromKeywords(keywords);
  return (
    <div className="p-5 flex flex-col gap-5">
      {tweets.map((item) => (
        <ListTweet key={item.id} {...item} />
      ))}
    </div>
  );
}
