import pool from "../config/db.js";
import { generateEmbedding } from "../utils/embedding.js";

/**
 * Creates content record and triggers background embedding generation.
 * This ensures the API responds quickly to the user.
 */
export const createContent = async ({ title, content }) => {
  const query = `
    INSERT INTO contents (title, content)
    VALUES ($1, $2)
    RETURNING id, title, content, created_at;
  `;

  const values = [title, content];
  const { rows } = await pool.query(query, values);
  const newContent = rows[0];

  // Professional Approach: Fire and forget the embedding generation
  // In a larger system, this would be a Message Queue (BullMQ, RabbitMQ)
  generateAndStoreEmbedding(newContent.id, title, content).catch(err => {
    console.error(`Post-processing failed for ID ${newContent.id}:`, err.message);
  });

  return newContent;
};

/**
 * Background task to generate embedding and update database.
 */
const generateAndStoreEmbedding = async (id, title, content) => {
  try {
    const fullText = `${title}\n\n${content}`;
    const embedding = await generateEmbedding(fullText);
    const embeddingString = `[${embedding.join(",")}]`;

    await pool.query(
      "UPDATE contents SET embedding = $1 WHERE id = $2",
      [embeddingString, id]
    );

    console.log(`✅ Background embedding populated for content: ${id}`);
  } catch (error) {
    // We log but don't throw, as this is a background fiber
    console.error(`❌ Background embedding failed for content ${id}:`, error.message);
  }
};

export const getAllContents = async () => {
  const query = `
    SELECT id, title, content, created_at
    FROM contents
    ORDER BY created_at DESC;
  `;

  const { rows } = await pool.query(query);
  return rows;
};
