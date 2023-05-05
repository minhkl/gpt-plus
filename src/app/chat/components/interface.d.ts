export type IMessage = {
  timestamp: number;
  content: string;
  author: "bot" | "user";
};
