import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-gd1oA9mAL93Jg1wFC51envwS",
  apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

export async function listModels() {
  // const openAI = new OpenAIApi(configuration);
  const res = await openAI.listModels();

  return res.data;
}

export default openAI;
