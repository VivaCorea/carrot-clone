"use client";

import { InitialTweets } from "@/app/(tabs)/tweets/page";

import { useState } from "react";
import { getMoreTweets, getTweetLastPage } from "@/app/(tabs)/tweets/actions";
import ListTweet from "./list-tweet";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const onClickNextPage = async () => {
    setIsLoading(true);
    const newTweets = await getMoreTweets(page + 1);
    setPage((prev) => prev + 1);
    setTweets((prev) => [...newTweets]);
    const lastPage = await getTweetLastPage();
    if (lastPage - 2 == page) {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };

  const onClickPrevPage = async () => {
    setIsLoading(true);
    const newTweets = await getMoreTweets(page - 1);
    if (newTweets.length !== 0) {
      setPage((prev) => prev - 1);
      setTweets((prev) => [...newTweets]);
    }
    setIsLastPage(false);
    setIsLoading(false);
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      {tweets.map((item) => (
        <ListTweet key={item.id} {...item} />
      ))}
      {page > 0 ? (
        <button
          onClick={onClickPrevPage}
          disabled={isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "<<<Prev Page"}
        </button>
      ) : null}
      {isLastPage ? null : (
        <button
          onClick={onClickNextPage}
          disabled={isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : ">>>Next Page"}
        </button>
      )}
    </div>
  );
}
