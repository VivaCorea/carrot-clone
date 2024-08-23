"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Input from "./input";
import { useDebouncedCallback } from "use-debounce";

export default function SearchTweet() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("keywords", term);
      replace(`/search?${params.toString()}`);
    } else {
      params.delete("keywords");
      replace(`/`);
    }
  }, 400);
  return (
    <>
      {pathname === "/" || pathname === "/search" ? (
        <div className="flex flex-col pt-5 pb-3 border-neutral-600 border-b">
          <Input
            name="tweet"
            type="text"
            required
            placeholder="Enter Keywords"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("keywords")?.toString()}
          />
        </div>
      ) : null}
    </>
  );
}
