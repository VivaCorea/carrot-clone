import db from "@/lib/db";
import getSession from "@/lib/session";
import { HandThumbUpIcon, UserIcon } from "@heroicons/react/24/solid";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getTweet(id: number) {
  try {
    const post = await db.tweet.update({
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
            likes: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
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
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  const likeTweet = async () => {
    "use server";
    const session = await getSession();
    try {
      await db.like.create({
        data: {
          tweet_id: id,
          user_id: session.id!,
        },
      });
      revalidatePath(`/tweets/${id}`);
    } catch (e) {}
  };

  const dislikeTweet = async () => {
    "use server";
    try {
      const session = await getSession();
      await db.like.delete({
        where: {
          id: {
            tweet_id: id,
            user_id: session.id!,
          },
        },
      });
      revalidatePath(`/post/${id}`);
    } catch (e) {}
  };
  async function getIsTweetLiked(tweet_id: number) {
    const session = await getSession();
    const like = await db.like.findUnique({
      where: {
        id: {
          tweet_id,
          user_id: session.id!,
        },
      },
    });
    return Boolean(like);
  }
  const isLiked = await getIsTweetLiked(id);
  const isOwner = await getIsOwner(tweet.user_id);
  return (
    <div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full overflow-hidden">
          {tweet.user.avatar !== null ? (
            <Image
              src={tweet.user.avatar}
              width={40}
              height={40}
              alt={tweet.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{tweet.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold">
          What {tweet.user.username} says ...
        </h3>
        <p className="mt-5 mb-5">{tweet.tweet}</p>
        <Link
          href="/"
          className="bg-orange-500 px-2 py-2 rounded-md text-white text-sm font-semibold"
        >
          Back
        </Link>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        {isOwner ? (
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
            Delete tweet
          </button>
        ) : null}
        <form action={isLiked ? dislikeTweet : likeTweet}>
          <button className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold">
            <HandThumbUpIcon className="size-5" />{" "}
            <span>Like ({tweet._count.likes})</span>
          </button>
        </form>
      </div>
    </div>
  );
}
