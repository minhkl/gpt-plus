"use client";
import { KeyboardEvent, useState } from "react";
import cx from "clsx";
import { useForm } from "react-hook-form";
import { apiChatCompletionsPost } from "@/apis/chats";
import { IMessage } from "./interface";
import { useOpenAISettingsContext } from "@/contexts/openAISettingsContext";
import { Scrollbars } from "react-custom-scrollbars-2";
import BotMessagge, { LoadingMessage } from "./BotMessage";

type IFormValues = {
  prompt: string;
};

type IComponent = {
  className?: string;
  initialMessages: Array<IMessage>;
};

export default function PromptForm({ className, initialMessages = [] }: IComponent) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [messages, setMessages] = useState<Array<IMessage>>([]);

  const { register, handleSubmit, reset } = useForm<IFormValues>();

  const { settings } = useOpenAISettingsContext();

  const onSubmit = (values: IFormValues) => {
    if (isRequesting) {
      return;
    }
    const { prompt } = values;
    setMessages((prevState) => [createUserMessage(prompt), ...prevState]);
    setIsRequesting(true);
    apiChatCompletionsPost({ prompt, temperature: settings.temperature, model: settings.model })
      .then((res) => {
        setMessages((prevState) => [createBotMessage(res.data.message), ...prevState]);
      })
      .finally(() => {
        setIsRequesting(false);
      });

    reset({ prompt: "" });
    return Promise.resolve();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className={cx(className, "flex flex-col h-full")}>
      <Scrollbars className="flex-grow" universal>
        <div className="flex flex-col-reverse gap-2 p-4 min-h-full">
          {isRequesting && <LoadingMessage />}
          {[...initialMessages, ...messages].map((message) =>
            message.author === "user" ? (
              <div key={message.timestamp} className="chat chat-end">
                <div className="chat-bubble chat-bubble-secondary whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            ) : (
              <BotMessagge message={message.content} key={message.timestamp} />
            )
          )}
        </div>
      </Scrollbars>
      <div className="divider mt-0"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 pt-0">
        <textarea
          placeholder="Send a message..."
          rows={1}
          className="textarea textarea-lg w-full bg-base-200"
          {...register("prompt")}
          onKeyDown={handleKeyPress}
        />
      </form>
    </div>
  );
}

const createBotMessage = (content: string): IMessage => ({
  timestamp: Date.now(),
  content,
  author: "bot",
});

const createUserMessage = (content: string): IMessage => ({
  timestamp: Date.now(),
  content,
  author: "user",
});
