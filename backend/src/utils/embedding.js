import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is missing");
}

export const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

export const generateEmbedding = async (text) => {
  // Production systems must not wait indefinitely for external APIs.
  // We use Promise.race to implement a strict 5s timeout.
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Embedding service timed out")), 10000)
  );

  try {
    const result = await Promise.race([
      model.embedContent(text),
      timeoutPromise
    ]);

    return result.embedding.values;
  } catch (error) {
    console.error("DEBUG: Embedding Error Details:", error);
    throw new Error(`Embedding service failed: ${error.message}`);
  }
};
