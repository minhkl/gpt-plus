import customAxios from "@/utils/customAxios";
import { IChatCompletionsPostParams, IChatCompletionPostResponse } from "@/app/api/chats/route";

export function apiChatCompletionsPost(params: IChatCompletionsPostParams) {
  return customAxios.post<IChatCompletionPostResponse>("/chats/", params);
}
