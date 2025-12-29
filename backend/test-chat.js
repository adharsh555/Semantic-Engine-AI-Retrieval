const API_URL = "http://localhost:4000/api/chat";

async function testChat() {
    console.log("🚀 Testing Conversational AI (RAG)...");

    // We'll search for information that was likely seeded in seed.js
    const query = "Tell me about the server maintenance policy phases.";
    console.log(`\n💬 Query: "${query}"`);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: query })
        });

        const result = await response.json();

        if (result.status === "success") {
            const { answer, citations } = result.data;
            console.log("\n✅ AI RESPONSE:");
            console.log("-----------------------------------------");
            console.log(answer);
            console.log("-----------------------------------------");

            console.log("\n🔗 SOURCES CITED (" + citations.length + "):");
            citations.forEach(c => {
                console.log(`- [Source ID: ${c.id}] ${c.title}`);
            });
        } else {
            console.error("\n❌ API Error:", result.error);
        }
    } catch (err) {
        console.error("\n❌ Request Failed:", err.message);
    }
}

testChat();
