import { formatToTimeAgo } from "@/lib/util";
import Image from "next/image";

interface UserProps {
  avatar: string | null;
  username: string;
  email: string | null;
  created_at: Date;
  id: number;
}

export default function UserDetail(user: UserProps) {
  return (
    <>
      <div className="relative size-28 rounded-md overflow-hidden">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={user.avatar! || ""}
          alt={user.username}
        />
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{user.username}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(user.created_at.toString())}
        </span>
        <span className="text-lg font-semibold">{user.email}</span>
      </div>
    </>
  );
}
