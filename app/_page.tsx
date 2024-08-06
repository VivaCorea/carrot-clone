"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleForm } from "./login/actions";

export default function Login() {
  const [state, action] = useFormState(handleForm, null);
  console.log(state);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요~</h1>
        <h2 className="text-xl">
          Login with email, username and password 12345!
        </h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          name="userName"
          type="text"
          placeholder="UserName"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.errors ?? []}
        />
        <FormButton text="Log in" />
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
