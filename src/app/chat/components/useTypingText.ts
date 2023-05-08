import { useState, useEffect } from "react";

type IOptions = {
  animate?: boolean;
  repeat?: boolean;
  delay?: number;
};

export default function useTypingText(text: string, options?: IOptions) {
  const { animate = true, repeat = false, delay = 20 } = options || {};
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
        setCharCount(0);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [animate, charCount, text.length, delay, repeat]);

  return text.substring(0, charCount);
}
