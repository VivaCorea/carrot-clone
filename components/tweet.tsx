interface TweetProps {
  tweet: string;
}
export default function Tweet({ tweet }: TweetProps) {
  return (
    <div>
      <h1 className="text-white text-4xl">Tweets {tweet}</h1>
    </div>
  );
}
