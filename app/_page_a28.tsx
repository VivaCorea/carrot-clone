/* "use client";

import Button from "@/components/btn";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { login } from "./_actions_a28";

export default function Login() {
  const [state, action] = useFormState(login, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요~</h1>
        <h2 className="text-xl">
          Login with email, username and password 12345!
        </h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="username"
          type="text"
          placeholder="UserName"
          required
          errors={state?.fieldErrors.username}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
        {state?.OK ? (
          <>
            <div className="primary-btn flex h-10 items-center justify-center gap-2 bg-green-600">
              WELCOME BACK!!
            </div>
          </>
        ) : null}
      </form>
    </div>
  );
}
 */
