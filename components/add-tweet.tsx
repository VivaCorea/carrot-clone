"use client";

import { usePathname } from "next/navigation";
import Input from "./input";
import Button from "./btn";
import { useFormState } from "react-dom";
import { uploadTweet } from "@/app/tweets/add/actions";

export default function AddTweet() {
  const pathname = usePathname();
  const [state, action] = useFormState(uploadTweet, null);
  return (
    <>
      {pathname === "/" ? (
        <div>
          <form action={action} className="flex flex-col pb-5 gap-2">
            <Input
              name="tweet"
              type="text"
              required
              placeholder="input tweet"
              errors={state?.fieldErrors.tweet}
            />
            <Button text="작성 완료" />
          </form>
        </div>
      ) : null}
    </>
  );
}
