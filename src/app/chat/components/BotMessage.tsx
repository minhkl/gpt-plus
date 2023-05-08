import useTypingText from "./useTypingText";

type IProps = {
  message: string;
};

export default function BotMessagge({ message: propMessage }: IProps) {
  const message = useTypingText(propMessage, { animate: true, delay: 10 });
  return <BaseMessage message={message} />;
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
