import { useEffect, useState } from "react";

type IProps = {
  message: string;
  animate?: boolean;
};

export default function BotMessagge({ message: propMessage, animate }: IProps) {
  const message = useAnimationText(propMessage, { animate: true });

  return (
    <div className="chat chat-start">
      <div className="chat-bubble">{message}</div>
    </div>
  );
}

export function LoadingMessage() {
  const message = useAnimationText("...", { repeat: true, delay: 300 });
  return (
    <div className="chat chat-start">
      <div className="chat-bubble">{message}</div>
    </div>
  );
}

const useAnimationText = (
  text: string,
  {
    animate = true,
    repeat = false,
    delay = 20,
  }: { animate?: boolean; repeat?: boolean; delay?: number }
) => {
  const [charCount, setCharCount] = useState(animate ? 0 : text.length);

  useEffect(() => {
    if (animate && charCount < text.length) {
      const timer = setTimeout(() => {
        setCharCount(charCount + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [animate, charCount, text.length, delay]);

  useEffect(() => {
    if (!repeat || !animate) {
      return;
    }
    if (charCount >= text.length) {
      const timer = setTimeout(() => {
        setCharCount(1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [animate, charCount, text.length, delay, repeat]);

  return text.substring(0, charCount);
};
