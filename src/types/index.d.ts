export type IMessage = {
  id: string;
  content: string;
  type: "bot" | "user";
};
