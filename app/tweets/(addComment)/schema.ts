import { z } from "zod";

export const responseSchema = z.object({
  payload: z
    .string({
      required_error: "comment is required",
    })
    .min(10),
  id: z.number({
    required_error: "id is required",
  }),
});

export type TweetResponseType = z.infer<typeof responseSchema>;
