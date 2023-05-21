import useTypingText from "./useTypingText";

type IProps = {
  message: string;
  animate?: boolean;
};

export default function BotMessagge({ message: propMessage, animate = false }: IProps) {
  const message = useTypingText(propMessage, { animate, delay: 10 });
  return <BaseMessage message={message} />;
}

export function UserMessage({ message }: { message: string }) {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble chat-bubble-secondary whitespace-pre-wrap">{message}</div>
    </div>
  );
}

export function LoadingMessage() {
  const message = useTypingText("...", { repeat: true, delay: 300 });
  return <BaseMessage message={message} />;
}

export function BaseMessage({ message }: { message: string }) {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble whitespace-pre-wrap">{message}</div>
    </div>
  );
}
