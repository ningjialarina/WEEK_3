// Import necessary modules
import { ask, say } from "./shared/cli.js";
import { gptPrompt } from "./shared/openai.js";

async function main() {
  say("Hello! This program is designed to help assess which part of your body is currently feeling the most uncomfortable. Please respond to the following questions with 'yes' or 'no' only.");

  const topic = "body discomfort"; // The topic for body testing questions

  // Dynamically generate body testing questions with GPT
  const questionsString = await gptPrompt(
    `Generate 4 body testing questions without providing the answers.
    The topic is ${topic}.
    Only ask questions with answers in yes or no.
    Format the questions as a JavaScript array of strings like this:
    ["question 1", "question 2", "question 3", "question 4"]
    Only include the array, starting with [ and ending with ].`,
    { max_tokens: 1024, temperature: 0.3 },
  );

  let questions = [];
  try {
    questions = JSON.parse(questionsString);
  } catch (_e) {
    say(`Error parsing questions string: "${questionsString}"`);
    return;
  }

  let reportedDiscomfort = []; // List to track which parts the user reports discomfort in

  for (let i = 0; i < questions.length; i++) { // Iterate through the questions and get the user's answers
    const response = await ask(questions[i]);
    if (response.toLowerCase() === "yes") {
      reportedDiscomfort.push(questions[i]); // Track which body parts the user reports discomfort in
    }
  }

  if (reportedDiscomfort.length > 0) {
    // Formatting the reported discomfort for prompt correctly
    const discomfortsForPrompt = reportedDiscomfort.join(", ");
    const reportedDiscomfortString = await gptPrompt(
        `Based on the reported discomforts: ${discomfortsForPrompt}. Please give corresponding advice for each，no more than 50 words.Do not say you are an AI`,
        { max_tokens: 1024, temperature: 0.3 },
    );
    say(`Here are the advices for your discomforts:\n${reportedDiscomfortString}`);
  } else {
    say("Based on your responses, you do not seem to have reported significant discomfort in response to any of the questions.");
  }
}

main();
