import customAxios from "@/utils/customAxios";
import { IChatCompletionsPostParams, IChatCompletionPostResponse } from "@/app/api/chats/route";

export function apiChatsPost({ prompt }: { prompt: string }) {
  return customAxios.post<{ message: string }>("/api/chats", {
    prompt,
  });
}

export function apiChatCompletionsPost(params: IChatCompletionsPostParams) {
  return customAxios.post<IChatCompletionPostResponse>("/api/chats/", params);
}
