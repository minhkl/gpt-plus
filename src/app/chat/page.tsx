import PromptForm from "./PromptForm";
import SideBar from "./SideBar";
import { OpenAISettingsProvider } from "@/contexts/openAISettingsContext";
import { listModels } from "@/utils/openai";

export const metadata = {
  title: "GPT+",
  description: "ChatGPT and more",
};

export default async function Chat() {
  const models = await listModels();
  const availableModels = models.data.filter((model) => model.owned_by === "openai");
  return (
    <OpenAISettingsProvider>
      <main className="flex flex-col h-screen">
        <div className="navbar bg-base-100">
          <h1 className="text-xl">GPT+</h1>
        </div>
        <div className="flex flex-grow">
          <PromptForm className=" flex-grow h-full" initialMessages={[]} />
          <SideBar className="h-full" models={availableModels} />
        </div>
      </main>
    </OpenAISettingsProvider>
  );
}
