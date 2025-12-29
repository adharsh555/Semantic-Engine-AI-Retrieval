import { createContent } from "./src/services/contentService.js";
import pool from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

async function test() {
    try {
        console.log("1. Testing Content Creation with Gemini Embedding...");
        const result = await createContent({
            title: "Gemini Integration Test",
            content: "This is a test to verify that Gemini embeddings (768 dimensions) are correctly generated and stored in Postgres."
        });
        console.log("   ✅ Content created with ID:", result.id);

        console.log("2. Verifying Database Vector Dimensions...");
        // Check if the stored vector has 768 dimensions
        const query = `SELECT vector_dims(embedding) as dims FROM contents WHERE id = $1`;
        const { rows } = await pool.query(query, [result.id]);

        const dims = rows[0]?.dims;
        console.log(`   Dimensions found: ${dims}`);

        if (dims === 768) {
            console.log("   ✅ SUCCESS: Vector has correct dimensions (768).");
        } else {
            console.error(`   ❌ FAILURE: Expected 768 dimensions, got ${dims}.`);
            process.exit(1);
        }

    } catch (e) {
        console.error("   ❌ Test Failed:", e);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

test();
