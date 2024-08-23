"use client";

import { _updateUser } from "@/app/users/[username]/edit/actions";
import Button from "@/components/btn";
import Input from "@/components/input";
import { useOptimistic } from "react";
import { useFormState } from "react-dom";

interface EditUserProps {
  isUnique: boolean;
  email: string | null | undefined;
  bio: string | null | undefined;
  password: string | null | undefined;
  username: string | null;
}

export default async function EditUser({
  isUnique,
  email,
  bio,
  password,
  username,
}: EditUserProps) {
  const [state, reducerFn] = useOptimistic(
    { isUnique, email, bio, password, username },
    (previousState, pl) => ({
      isUnique: !previousState.isUnique,
      email: previousState.isUnique ? previousState.email : email,
      bio: previousState.isUnique ? previousState.bio : bio,
      password: previousState.isUnique ? previousState.password : password,
      username: previousState.isUnique ? previousState.username : username,
    })
  );
  const [formState, action] = useFormState(_updateUser, null);

  return (
    <>
      {state.isUnique ? (
        <div>
          <form action={action} className="p-5 flex flex-col gap-5">
            <Input
              name="username"
              required
              placeholder="username"
              type="text"
              errors={formState?.fieldErrors.username}
              defaultValue={username || ""}
            />
            <Input
              name="email"
              type="text"
              required
              placeholder="email"
              errors={formState?.fieldErrors.email}
              defaultValue={email || ""}
            />
            <Input
              name="bio"
              type="text"
              required
              placeholder="bio"
              errors={formState?.fieldErrors.bio}
              defaultValue={bio || ""}
            />
            <Input
              name="password"
              type="password"
              required
              placeholder="password"
              errors={formState?.fieldErrors.password}
            />
            <Button text="Update" />
          </form>
        </div>
      ) : (
        <div>Test</div>
      )}
    </>
  );
}
