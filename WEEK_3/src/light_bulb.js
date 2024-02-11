import { gptPrompt } from "./shared/openai.js";
import { ask, say } from "./shared/cli.js";

main();

async function main() {
  say("Hello, GPT!");

  const topic = await ask("What topics you intested in?");


  say("");

  const prompt =
    `I like ${topic}. Create a light bulb joke about my inputs.`;

  const lightbulb = await gptPrompt(prompt, { temperature: 0.7 });
  say(`"""\n${lightbulb}\n"""`);
}