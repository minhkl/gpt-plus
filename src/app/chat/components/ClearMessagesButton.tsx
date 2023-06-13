import cx from "clsx";
import { apiChatCompletionsClearBulk } from "@/apis/chats";
import { useState } from "react";

type IProps = {
  onClearSuccess: () => void;
  className?: string;
};

const ClearMessagesButton = ({ className, onClearSuccess }: IProps) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const handleClick = () => {
    setIsRequesting(true);
    apiChatCompletionsClearBulk()
      .then(() => {
        onClearSuccess();
      })
      .catch((error) => {
        console.error("Error while clearing messages", error);
      })
      .finally(() => {
        setIsRequesting(false);
      });
  };
  return (
    <button
      className={cx(className, "btn btn-neutral")}
      onClick={handleClick}
      disabled={isRequesting}
    >
      Clear Conversation
    </button>
  );
};

export default ClearMessagesButton;
