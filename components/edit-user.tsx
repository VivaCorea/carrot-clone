"use client";

import { _updateUser } from "@/app/users/[username]/edit/actions";
import Button from "@/components/btn";
import Input from "@/components/input";
import { useOptimistic } from "react";
import { useFormState } from "react-dom";

interface EditUserProps {
  isChanged: boolean;
  email: string | null | undefined;
  bio: string | null | undefined;
  password: string | null | undefined;
  username: string | null;
}

export default async function EditUser({
  isChanged,
  email,
  bio,
  password,
  username,
}: EditUserProps) {
  const [state, reducerFn] = useOptimistic(
    { isChanged, email, bio, password, username },
    (previousState, pl) => ({
      /*  isChanged:
        previousState.email !== email ||
        previousState.bio !== bio ||
        previousState.password !== "" ||
        previousState.username !== username,
      email,
      bio,
      password,
      username, */
      isChanged: !previousState.isChanged,
      email: previousState.isChanged ? previousState.email : email,
      bio: previousState.isChanged ? previousState.bio : bio,
      password: previousState.isChanged ? previousState.password : password,
      username: previousState.isChanged ? previousState.username : username,
    })
  );
  const [formState, action] = useFormState(_updateUser, null);

  return (
    <>
      <div>
        <div>isChanged: {state.isChanged.toString()}</div>
        <form action={action} className="p-5 flex flex-col gap-5">
          <Input
            name="username"
            required
            placeholder="username"
            type="text"
            errors={formState?.fieldErrors.username}
            defaultValue={state.username || ""}
          />
          <Input
            name="email"
            type="text"
            required
            placeholder="email"
            errors={formState?.fieldErrors.email}
            defaultValue={state.email || ""}
          />
          <Input
            name="bio"
            type="text"
            placeholder="bio"
            errors={formState?.fieldErrors.bio}
            defaultValue={state.bio || ""}
          />
          <Input
            name="password"
            type="password"
            required
            placeholder="password"
            errors={formState?.fieldErrors.password}
          />
          {state.isChanged ? <div>Done.</div> : <Button text="Update" />}
        </form>
      </div>
    </>
  );
}
