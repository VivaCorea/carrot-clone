/* import { notFound } from "next/navigation";
import { getUser } from "./actions";
import { unstable_cache as nextCache } from "next/cache";
import db from "@/lib/db";
import EditUser from "@/components/edit-user";

const getCachedUser = nextCache(getUser, ["user-detail"], {
  tags: ["user-detail"],
  revalidate: 60,
});
async function getUserStatus(username: string) {
  const isUnique = await db.user.findUnique({
    where: {
      username,
    },
  });

  return {
    email: isUnique?.email,
    bio: isUnique?.bio,
    password: isUnique?.password,
    isUnique: Boolean(isUnique),
  };
}

function getCachedUserStatus(username: string) {
  const cachedOperation = nextCache(getUserStatus, ["user-status"], {
    tags: [`res-status-${username}`],
  });
  return cachedOperation(username);
}

export default async function EditUserPage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;
  if (username === null || username === "" || username === undefined) {
    return notFound();
  }
  const user = await getCachedUser();
  if (!user) {
    return notFound();
  }

  const { isUnique, email, bio, password } = await getCachedUserStatus(
    username
  );
  return (
    <EditUser
      isUnique={isUnique}
      email={email}
      bio={bio}
      password={password}
      username={username}
    />
  );
}
 */
