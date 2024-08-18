import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/util";
import { EyeIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "@/components/btn-like-tweet";

async function getTweet(id: number) {
  try {
    const tweet = await db.tweet.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            response: true,
          },
        },
      },
    });
    return tweet;
  } catch (e) {
    return null;
  }
}

const getCachedPost = nextCache(getTweet, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});

async function getLikeStatus(tweet_id: number) {
  const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweet_id,
        user_id: session.id!,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweet_id,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

function getCachedLikeStatus(tweet_id: number) {
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweet_id}`],
  });
  return cachedOperation(tweet_id);
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getCachedPost(id);
  if (!tweet) {
    return notFound();
  }
  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={tweet.user.avatar! || ""}
          alt={tweet.user.username}
        />
        <div>
          <span className="text-sm font-semibold">{tweet.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(tweet.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <p className="mb-5">{tweet.tweet}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>Views {tweet.views}</span>
        </div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} tweet_id={id} />
      </div>
    </div>
  );
}
