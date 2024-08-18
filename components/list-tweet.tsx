import { formatToTimeAgo } from "@/lib/util";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface ListTweetProps {
  tweet: string | null;
  created_at: Date;
  id: number;
  _count: TweetCountProps;
}

interface TweetCountProps {
  likes: number;
  response: number;
}

export default function ListTweet({
  tweet,
  created_at,
  id,
  _count,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{tweet}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
      </div>
      <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center">
        <span>
          <HandThumbUpIcon className="size-4" />
          {_count.likes}
        </span>
        <span>
          <ChatBubbleBottomCenterIcon className="size-4" />
          {_count.response}
        </span>
      </div>
    </Link>
  );
}
