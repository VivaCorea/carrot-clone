"use server";

export async function uploadTweet(formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };
  console.log(data);
}
