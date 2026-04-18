import OpenAI from "openai";

/**
 * Generate a professional email using OpenAI.
 * @param {Object} params - { purpose, tone, type, length, keywords }
 * @returns {Promise<string>} Generated email text
 */
export async function generateEmailWithOpenAI({ purpose, tone, type, length, keywords }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const client = new OpenAI({ apiKey });

  const prompt = `You are a professional email writer. Write a complete, structured email based on the following requirements.

Requirements:
- Purpose: ${purpose || "General correspondence"}
- Tone: ${tone || "Professional"} (match this tone exactly)
- Formality: ${type || "Formal"} (match this level of formality)
- Length: ${length || "Medium"} (Short = 1 short paragraph, Medium = 2 paragraphs, Long = 3+ paragraphs)
${keywords ? `- Weave these keywords naturally into the email (do not list them as bullets): ${keywords}` : ""}

Instructions:
- Include a clear "Subject:" line at the very beginning.
- Write a complete email with greeting, body, and closing.
- Sound human and natural; avoid robotic or template-like phrasing.
- Match the requested tone and formality throughout.
- Respect the requested length.
- Do not add meta-commentary or explanations—output only the email text.`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You output only the raw email text, starting with Subject: and ending with a sign-off. No markdown, no extra commentary.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 1024,
    temperature: 0.7,
  });

  const generatedText = completion?.choices?.[0]?.message?.content?.trim();
  if (!generatedText) {
    throw new Error("OpenAI returned no content");
  }

  return generatedText;
}
