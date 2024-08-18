"use client";

import { useOptimistic } from "react";
import Input from "./input";
import { uploadResponse } from "@/app/tweets/(addComment)/actions";
import { useFormState } from "react-dom";
import Button from "./btn";

interface AddResponseProps {
  isAdded: boolean;
  payload: string | null | undefined;
  tweet_id: number;
}

export default function AddResponse({
  isAdded,
  payload,
  tweet_id,
}: AddResponseProps) {
  const [state, reducerFn] = useOptimistic(
    { isAdded, payload },
    (previousState, pl) => ({
      isAdded: !previousState.isAdded,
      payload: previousState.isAdded ? previousState.payload : payload,
    })
  );
  const [formState, action] = useFormState(uploadResponse, null);
  return (
    <>
      {state.isAdded ? (
        <p> {state.payload}</p>
      ) : (
        <form className="flex flex-col gap-3" action={action}>
          <Input
            name="payload"
            type="text"
            placeholder="Response"
            required
            errors={formState?.fieldErrors.payload}
          />
          <input type="hidden" value={tweet_id} name="tweetId" />
          <Button text="Response" />
        </form>
      )}
    </>
  );
}
