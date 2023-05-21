import customAxios from "@/utils/customAxios";
import { IMessage } from "@/types";

type IChatCompletionsPostParams = {
  prompt: string;
  temperature: number;
  model: string;
};

export function apiChatCompletionsPost(params: IChatCompletionsPostParams) {
  return customAxios.post<IMessage>("/messages", params);
}

export function apiChatComletionsGet() {
  return customAxios.get<IMessage[]>("/messages");
}
