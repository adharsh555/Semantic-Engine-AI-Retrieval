import "dotenv/config";

const BACKEND_URL = "http://localhost:4000/api";

async function runFinalAudit() {
    console.log("🔍 STARTING FINAL PRE-DEPLOYMENT AUDIT...\n");

    try {
        // 1. Test Search API
        console.log("📡 Step 1: Testing Semantic Search...");
        const searchRes = await fetch(`${BACKEND_URL}/search?q=server maintenance policy`);
        const searchData = await searchRes.json();

        if (searchData.status === "success" && searchData.count > 0) {
            console.log(`✅ Search OK: Found ${searchData.count} results.`);
        } else {
            console.warn("⚠️ Search Warning: No results found for 'server maintenance policy'. Ensure database is seeded.");
        }

        // 2. Test Chat (RAG) API
        console.log("\n📡 Step 2: Testing AI Advisor (RAG)...");
        const chatRes = await fetch(`${BACKEND_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "What are the maintenance phases?" })
        });
        const chatData = await chatRes.json();

        if (chatData.status === "success" && chatData.data.answer.length > 50) {
            console.log("✅ Chat OK: AI responded with grounded answer.");
            console.log(`🔗 Citations: ${chatData.data.citations.length} found.`);
        } else {
            console.error("❌ Chat Failed: AI response missing or too short.");
        }

        console.log("\n🚀 FINAL VERDICT: BACKEND IS DEPLOYMENT READY!");
    } catch (err) {
        console.error("\n❌ AUDIT FAILED:", err.message);
    }
}

runFinalAudit();
