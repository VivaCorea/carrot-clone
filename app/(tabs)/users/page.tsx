import UserList from "@/components/user-list";
import { getUsers } from "./actions";

export default async function Users() {
  const users = await getUsers();
  return (
    <div>
      <UserList users={users} />
    </div>
  );
}
