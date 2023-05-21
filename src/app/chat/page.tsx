import PromptForm from "./components/PromptForm";
import SideBar from "./components/SideBar";
import { OpenAISettingsProvider } from "@/contexts/openAISettingsContext";
import { listModels } from "@/utils/openai";
import { apiChatComletionsGet } from "@/apis/chats";

export const metadata = {
  title: "GPT+",
  description: "ChatGPT and more",
};

export default async function Chat() {
  const models = await listModels();
  const availableModels = models.data.filter((model) => model.owned_by === "openai");
  const initialMessages = await apiChatComletionsGet();
  return (
    <OpenAISettingsProvider>
      <main className="flex flex-col h-screen">
        <div className="navbar bg-base-100">
          <h1 className="text-xl">GPT+</h1>
        </div>
        <div className="flex flex-grow">
          <PromptForm className=" flex-grow h-full" initialMessages={initialMessages.data} />
          <SideBar className="h-full" models={availableModels} />
        </div>
      </main>
    </OpenAISettingsProvider>
  );
}
