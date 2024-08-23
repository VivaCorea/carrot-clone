"use client";

import { Users } from "@/app/(tabs)/users/actions";
import Link from "next/link";
import UserDetail from "./user-detail";

interface UserListProps {
  users: Users;
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="p-5 flex flex-col gap-5">
      {users.map((user) => (
        <Link
          key={user.id}
          href={`/users/${user.username}`}
          className="flex gap-5"
        >
          <UserDetail key={user.id} {...user} />
        </Link>
      ))}
    </div>
  );
}
