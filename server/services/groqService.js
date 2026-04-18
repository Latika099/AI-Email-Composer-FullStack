import Groq from "groq-sdk";

export async function generateEmail(prompt) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const groq = new Groq({ apiKey });

  try {
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
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 1024,
    });

    console.log("Groq response received");

    const generatedText =
      completion?.choices?.[0]?.message?.content?.trim();

    console.log("Generated text:", generatedText);

    if (!generatedText) {
      throw new Error("Groq returned no content");
    }

    return generatedText;
  } catch (error) {
    console.error("Groq API Error:", error);
    throw error;
  }
}