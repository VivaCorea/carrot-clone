"use client";

import Button from "@/components/btn";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { login } from "./actions";
import SocialLogin from "@/components/social-login";
import { PASSWORD_MIN_LEN } from "@/lib/constants";
import Link from "next/link";

export default function Login() {
  const [state, action] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요~</h1>
        <h2 className="text-xl">Login with email, password!</h2>
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
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LEN}
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
        <div className="flex flex-col items-center gap-3 w-full">
          <Link href="/create-account" className="primary-btn py-2.5">
            Create Account
          </Link>
        </div>
      </form>
      <SocialLogin />
    </div>
  );
}
