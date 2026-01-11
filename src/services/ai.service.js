const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = {
  role: "system",
  content:`You are a helpful assistant.
  Keep it short and to the point. Don't make it too long. do not use * or ** or _ or __. Do not use markdown.
  Before you answer any question you have to search the web for the answer if you don't know the answer then say "I don't know".
  Use bullet points to list the answers.
  .
  `
};

async function generateResponse(chatHistory) {

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [SYSTEM_PROMPT, ...chatHistory],
  });

  return completion.choices[0].message.content;
}

module.exports = generateResponse;
