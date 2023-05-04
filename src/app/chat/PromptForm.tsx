"use client";
import { KeyboardEvent, useEffect, useState } from "react";
import cx from "clsx";
import { useForm } from "react-hook-form";
import customAxios from "@/utils/customAxios";
import { apiChatCompletionsPost } from "@/apis/chats";
import { IMessage } from "./interface";
import { useOpenAISettingsContext } from "@/contexts/openAISettingsContext";
import { Scrollbars } from "react-custom-scrollbars-2";

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
      <Scrollbars className="flex-grow">
        <div className="flex flex-col-reverse gap-2 p-4 min-h-full">
          {isRequesting && <PendingMessage />}
          {[...initialMessages, ...messages].map((message) => (
            <div
              key={message.timestamp}
              className={cx("chat", {
                "chat-start": message.author === "user",
                "chat-end": message.author !== "user",
              })}
            >
              <div className="chat-bubble">{message.content}</div>
            </div>
          ))}
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

function PendingMessage() {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDotCount((prevValue) => (prevValue + 1) % 3);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="chat chat-end">
      <div className="chat-bubble">{"".padStart(dotCount + 1, ".")}</div>
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
