import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ Error: GEMINI_API_KEY environment variable is missing in .env");
  process.exit(1);
}

async function testGeminiAPI() {
  console.log("🔍 Testing Gemini API Key...\n");

  try {
    // Initialize client
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log("✅ GoogleGenerativeAI client initialized");

    // Test 1: Basic text generation (simple and quick)
    console.log("\n📝 Test 1: Simple text generation...");
    const textModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const textResult = await textModel.generateContent("Say 'API is working' in 5 words or less");
    const textResponse = await textResult.response;
    console.log("✅ Text generation works!");
    console.log("   Response:", textResponse.text().substring(0, 100));

    // Test 2: Embedding generation (what the RAG system uses)
    console.log("\n🧮 Test 2: Embedding generation (gemini-embedding-001)...");
    const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const embedResult = await embeddingModel.embedContent({
      content: { parts: [{ text: "test query for embedding" }] },
      outputDimensionality: 768
    });
    console.log("✅ Embedding generation works!");
    console.log("   Vector dimensions:", embedResult.embedding.values.length);
    console.log("   First 5 values:", embedResult.embedding.values.slice(0, 5));

    // Test 3: Chat model (gemini-flash-latest used in chatService)
    console.log("\n💬 Test 3: Chat model (gemini-flash-latest)...");
    const chatModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const chatResult = await chatModel.generateContent("What is 2+2?");
    const chatResponse = await chatResult.response;
    console.log("✅ Chat model works!");
    console.log("   Response:", chatResponse.text().substring(0, 100));

    console.log("\n✨ All API tests PASSED! Your API key is valid and working.");
    console.log("\n⚠️  Free tier limits (as of 2024):");
    console.log("   - 60 requests per minute");
    console.log("   - 1.5M tokens per minute");
    console.log("   - Text generation: 32k tokens per request");
    console.log("   - Embeddings: 2048 tokens per request");

  } catch (error) {
    console.error("❌ API Test FAILED!");
    console.error("Error:", error.message);
    if (error.errorDetails) {
      console.error("Details:", error.errorDetails);
    }
    process.exit(1);
  }
}

testGeminiAPI();
