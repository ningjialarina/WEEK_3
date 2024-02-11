/**
 * This program prompts the user to enter their name and hometown
 * and then uses GPT-3 language model to generate a limerick about the user.
 */

import { gptPrompt } from "./shared/openai.js";
import { ask, say } from "./shared/cli.js";

main();

async function main() {
  say("Hello, GPT!");

  const animal = await ask("What is an animal come up in your mind?");
  const season = await ask("Which season do you like?");

  say("");

  const prompt =
    `I like ${animal} and I like ${season}. Create a Haikus about my inputs.`;

  const haikus = await gptPrompt(prompt, { temperature: 0.7 });
  say(`"""\n${haikus}\n"""`);
}