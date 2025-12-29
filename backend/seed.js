import "dotenv/config";
import { createContent } from "./src/services/contentService.js";
import pool from "./src/config/db.js";

// Configuration already handled by import "dotenv/config"

const sampleData = [
    {
        title: "Payment Failure Handling",
        content: "If a payment fails, retry automatically and notify the user via email and SMS."
    },
    {
        title: "Password Reset",
        content: "Users can reset their password from account settings by clicking the Forgot Password link and following the email instructions."
    },
    {
        title: "Subscription Plans",
        content: "We offer three tiers: Free, Pro, and Enterprise. Each tier includes different features and API limits tailored to your needs."
    },
    {
        title: "API Rate Limits",
        content: "Our free tier allows up to 15 requests per minute. Pro users get 500 RPM, and Enterprise users have custom quotas."
    },
    {
        title: "Server Maintenance Policy",
        content: "Scheduled maintenance occurs every Sunday at 03:00 UTC. The process has three phases: 1. Read-only transition, 2. Backup and Update, 3. Health Check and Restoration."
    }
];

async function seed() {
    try {
        console.log("🌱 Seeding database with sample content...");
        for (const item of sampleData) {
            const result = await createContent(item);
            console.log(`✅ Inserted: "${item.title}" (ID: ${result.id})`);
        }
        console.log("✨ Seeding entries complete!");
        console.log("⏳ Waiting 10s for background embedding tasks to finish...");
        await new Promise(resolve => setTimeout(resolve, 10000));
        console.log("✅ All background tasks should be complete now.");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

seed();
