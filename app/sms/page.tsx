"use client";

import Button from "@/components/btn";
import Input from "@/components/input";
import { smsVerification } from "./actions";
import { useFormState } from "react-dom";

export default function SMSLogin() {
  const [state, action] = useFormState(smsVerification, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your Phone Number.</h2>
      </div>
      <form className="flex flex-col gap-3" action={action}>
        <Input name="phone" type="number" placeholder="Phone Number" required />
        <Input
          name="token"
          type="number"
          placeholder="Verification Code"
          required
        />
        <Button text="Verify" />
      </form>
    </div>
  );
}
