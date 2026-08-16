import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ Error: GEMINI_API_KEY environment variable is missing in .env");
  process.exit(1);
}

async function testEmbedding() {
  console.log("🔍 Testing Gemini Embedding API (gemini-embedding-001)...\n");

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log("✅ GoogleGenerativeAI client initialized");

    console.log("\n🧮 Generating embedding...");
    const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const embedResult = await embeddingModel.embedContent({
      content: { parts: [{ text: "What is semantic search?" }] },
      outputDimensionality: 768
    });
    
    console.log("✅ SUCCESS! Embedding generation works!");
    console.log("   Vector dimensions:", embedResult.embedding.values.length);
    console.log("   First 10 values:", embedResult.embedding.values.slice(0, 10).map(v => v.toFixed(4)));
    console.log("\n✨ Your API key is VALID and working for RAG/embedding!");
    console.log("\n📌 Your SemanticEngine RAG system will work with this API key.");

  } catch (error) {
    console.error("\n❌ Embedding API Test FAILED!");
    console.error("Error:", error.message);
    if (error.status) {
      console.error("Status:", error.status);
    }
    process.exit(1);
  }
}

testEmbedding();
