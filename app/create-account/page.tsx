"use client";
import Button from "@/components/btn";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import { PASSWORD_MIN_LEN } from "@/lib/constants";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요~</h1>
        <h2 className="text-xl">Fill in the form below to join</h2>
      </div>
      <form className="flex flex-col gap-3" action={action}>
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
        />
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
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN_LEN}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          errors={state?.fieldErrors.confirm_password}
          minLength={PASSWORD_MIN_LEN}
        />
        <Button text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  );
}
