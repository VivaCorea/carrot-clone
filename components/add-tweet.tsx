"use client";

import { usePathname } from "next/navigation";
import Input from "./input";
import Button from "./btn";

export default function AddTweet() {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/" ? (
        <div>
          <form className="flex flex-col py-5 gap-2">
            <Input
              name="tweet"
              type="text"
              required
              placeholder="input tweet"
            />
            <Button text="작성 완료" />
          </form>
        </div>
      ) : null}{" "}
    </>
  );
}
