import { semanticSearch } from "./searchService.js";
import { genAI } from "../utils/embedding.js";

const chatModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

/**
 * Orchestrates Retrieval-Augmented Generation (RAG)
 * 1. Search for context
 * 2. Augment prompt with context
 * 3. Generate response using Gemini
 */
export const chatWithContext = async (query) => {
    // 1. Retrieve the top 5 most relevant documents
    const searchResults = await semanticSearch({ query, limit: 5 });

    if (!searchResults || searchResults.length === 0) {
        return {
            answer: "I'm sorry, I couldn't find any relevant information in my knowledge base to answer that specifically.",
            citations: []
        };
    }

    // 2. Prepare context for the prompt
    const contextText = searchResults.map((res, i) =>
        `[Source ID: ${res.id}]\nTitle: ${res.title}\nContent: ${res.content}`
    ).join("\n\n---\n\n");

    const systemPrompt = `
You are the "SemanticEngine Advisor". You provide accurate, grounded answers based ONLY on the provided context below.

CONTEXT:
${contextText}

INSTRUCTIONS:
- Answer the user's question using the context above.
- If the context does not contain the answer, say: "I'm sorry, but I don't have enough information in my knowledge base to answer that."
- DO NOT use outside knowledge.
- For every factual claim you make, CITE the source by its "Source ID" in square brackets, like [Source ID: 123].
- Keep the answer professional, concise, and helpful.

USER QUESTION:
${query}
`;

    // 3. Generate grounded response
    try {
        const result = await chatModel.generateContent(systemPrompt);
        const response = await result.response;
        const answer = response.text();

        // Extract which citations were actually used to return them to the frontend
        const usedCitations = searchResults.filter(res =>
            answer.includes(`[Source ID: ${res.id}]`)
        );

        return {
            answer,
            citations: usedCitations
        };
    } catch (error) {
        console.error("Gemini Chat Error Details:", error);
        throw new Error(`AI Advisor Error: ${error.message}`);
    }
};
