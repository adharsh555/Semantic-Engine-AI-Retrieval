import pool from "../config/db.js";
import { generateEmbedding } from "../utils/embedding.js";

/**
 * Performs semantic search on content using vector similarity.
 * @param {Object} params
 * @param {string} params.query - The search query string.
 * @param {number} [params.limit=5] - Number of results to return.
 * @returns {Promise<Array>} List of relevant content items with similarity distance.
 */
export const semanticSearch = async ({ query, limit = 5 }) => {
  try {
    // 1. Generate embedding for the search query using Gemini
    // This converts the natural language query into a 768-dimensional vector
    const queryEmbedding = await generateEmbedding(query);
    console.log("✅ Query embedding generated");

    // 2. Perform vector similarity search in PostgreSQL
    // The <=> operator calculates the cosine distance (smaller is better/closer)
    // pgvector format needs the vector as a string: '[val1, val2, ...]'
    const embeddingString = `[${queryEmbedding.join(",")}]`;

    const sql = `
      SELECT 
        id, 
        title, 
        content, 
        created_at,
        embedding <=> $1 AS distance
      FROM contents
      WHERE embedding IS NOT NULL
      ORDER BY distance ASC
      LIMIT $2;
    `;

    const values = [embeddingString, limit];
    const { rows } = await pool.query(sql, values);

    return rows;
  } catch (error) {
    console.error("Error in semanticSearch service:", error);
    throw error;
  }
};
