import Button from "@/components/btn";
import ListTweet from "@/components/list-tweet";
import UserDetail from "@/components/user-detail";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { notFound } from "next/navigation";
async function getTweetsFromUserId(userId: number) {
  const tweets = await db.tweet.findMany({
    where: {
      user_id: userId,
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
async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getUser(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
  return user;
}

export default async function UserNameDetail({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;
  if (username === null || username === "" || username === undefined) {
    return notFound();
  }
  const user = await getUser(username);
  if (!user) {
    return notFound();
  }
  const isOwner = await getIsOwner(user.id);
  const userDetail = {
    avatar: user.avatar,
    username: user.username,
    created_at: user.created_at,
    id: user.id,
    email: user.email,
  };

  const tweets = await getTweetsFromUserId(user.id);
  return (
    <>
      <div className="border-b-2 p-2 m-2 text-2xl">User Profile</div>

      <UserDetail key={user.id} {...userDetail} />
      {isOwner ? (
        <Link href={`/users/${user.username}/edit`} className="flex gap-5">
          <span>Edit</span>
        </Link>
      ) : null}
      <div className="m-2"></div>
      <div className="border-t-2 p-2 text-2xl">Tweets</div>
      <div className="p-5 flex flex-col gap-5">
        {tweets.map((item) => (
          <ListTweet key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}
