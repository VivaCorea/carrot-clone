import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
    //redirect("/home");
  };
  return (
    <div>
      <h1>Hej! {user?.username}!</h1>
      <h2>email: {user?.email}!</h2>
      <form action={logOut}>
        <button>LogOut</button>
      </form>
    </div>
  );
}
