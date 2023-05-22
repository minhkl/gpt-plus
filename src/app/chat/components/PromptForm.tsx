"use client";
import { KeyboardEvent, useState, useRef, useEffect, LegacyRef } from "react";
import cx from "clsx";
import { useForm } from "react-hook-form";
import { apiChatCompletionsPost } from "@/apis/chats";
import { IMessage } from "@/types";
import { useOpenAISettingsContext } from "@/contexts/openAISettingsContext";
import { Scrollbars } from "react-custom-scrollbars-2";
import BotMessagge, { LoadingMessage, UserMessage } from "./BotMessage";
import useResizeObserver from "@react-hook/resize-observer";

type IFormValues = {
  prompt: string;
};

type IComponent = {
  className?: string;
  initialMessages: Array<IMessage>;
};

type ILocalMessage = IMessage & {
  isNew?: boolean;
};

export default function PromptForm({ className, initialMessages = [] }: IComponent) {
  const messageBoxRef = useRef<HTMLDivElement | null>(null);
  const scrollbarRef = useRef<Scrollbars | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [messages, setMessages] = useState<Array<ILocalMessage>>([]);

  const { register, handleSubmit, reset } = useForm<IFormValues>();

  const { settings } = useOpenAISettingsContext();

  useResizeObserver(messageBoxRef, () => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollToBottom();
    }
  });

  const onSubmit = (values: IFormValues) => {
    if (isRequesting) {
      return;
    }
    const { prompt } = values;
    setMessages((prevState) => [createUserMessage(prompt), ...prevState]);
    setIsRequesting(true);
    apiChatCompletionsPost({ prompt, temperature: settings.temperature, model: settings.model })
      .then((res) => {
        setMessages((prevState) => [createBotMessage(res.data.content), ...prevState]);
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
      <Scrollbars className="flex-grow" universal ref={scrollbarRef}>
        <div className="flex flex-col-reverse gap-2 p-4 min-h-full" ref={messageBoxRef}>
          {isRequesting && <LoadingMessage />}
          {[...messages, ...initialMessages].map((message) =>
            message.type === "user" ? (
              <UserMessage message={message.content} key={message.id} />
            ) : (
              <BotMessagge
                message={message.content}
                key={message.id}
                animate={(message as ILocalMessage).isNew}
              />
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

const createBotMessage = (content: string): ILocalMessage => ({
  id: `${Date.now()}`,
  content,
  type: "bot",
  isNew: true,
});

const createUserMessage = (content: string): ILocalMessage => ({
  id: `${Date.now()}`,
  content,
  type: "user",
  isNew: true,
});
