import { useEffect, useState } from "react";

type IProps = {
  promise: Promise<any>;
  message: string;
};

export default function BotMessagge({ promise, message: propMessage }: IProps) {
  const [message, setMessage] = useState<string>(propMessage);

  useEffect(() => {
    if (promise) {
      promise.then((value) => setMessage(value as string));
    }
  }, [promise]);

  return (
    <div className="chat chat-end">
      <div className="chat-bubble">{message}</div>
    </div>
  );
}
