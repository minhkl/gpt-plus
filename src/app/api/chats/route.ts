import promiser from "@/utils/promiser";
import { NextResponse } from "next/server";
import openAI from "@/utils/openai";
import { CreateChatCompletionRequest } from "openai";

export type IChatCompletionsPostParams = {
  prompt: string;
  temperature: number;
  model: string;
};
export type IChatCompletionPostResponse = {
  message: string;
};
export async function POST(request: Request) {
  const {
    prompt,
    temperature = 0.7,
    model = "gpt-3.5-turbo",
  }: IChatCompletionsPostParams = await request.json();
  // return NextResponse.json({
  //   message: `You asked "${prompt}"`,
  // });

  const requestParams: CreateChatCompletionRequest = {
    model,
    temperature,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const [res, error] = await promiser(openAI.createChatCompletion(requestParams));

  if (error) {
    return NextResponse.error();
  }

  const message = res.data.choices[0].message?.content;
  return NextResponse.json({ message });
}
