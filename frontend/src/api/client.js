let API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
if (!API_BASE.endsWith("/api")) {
    API_BASE = API_BASE.endsWith("/") ? `${API_BASE}api` : `${API_BASE}/api`;
}

export const createContent = async (data) => {
    const res = await fetch(`${API_BASE}/contents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create content");
    }
    return res.json();
};

export const searchContent = async (query) => {
    const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Search failed");
    return response.json();
};

export const sendChatMessage = async (message) => {
    const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });
    if (!response.ok) throw new Error("Chat failed");
    return response.json();
};
