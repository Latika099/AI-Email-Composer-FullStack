import Groq from "groq-sdk";

// Current active model on Groq (replaces deprecated llama-3.1-8b-instant)
const GROQ_MODEL = "openai/gpt-oss-20b";

export async function generateEmail(prompt) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const groq = new Groq({ apiKey });

  try {
    console.log(`[GroqService] Calling model: ${GROQ_MODEL}`);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You output only the raw email text, starting with Subject: and ending with a sign-off. No markdown, no extra commentary.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: GROQ_MODEL,
      temperature: 0.7,
      max_tokens: 1024,
    });

    console.log("[GroqService] Response received from Groq");

    const generatedText =
      completion?.choices?.[0]?.message?.content?.trim();

    if (!generatedText) {
      throw new Error("Groq returned no content");
    }

    console.log("[GroqService] Generated text length:", generatedText.length);
    return generatedText;
  } catch (error) {
    // Log status + safe error details without exposing the API key
    console.error("[GroqService] Error status:", error?.status ?? "N/A");
    console.error("[GroqService] Error message:", error?.message ?? error);
    if (error?.error) {
      console.error("[GroqService] Groq error body:", JSON.stringify(error.error));
    }
    throw error;
  }
}