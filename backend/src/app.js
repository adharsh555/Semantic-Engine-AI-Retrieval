import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";
import { apiLimiter } from "./utils/rateLimiter.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Apply rate limiting to all /api routes
app.use("/api", apiLimiter);

// Routes
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/contents", contentRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/chat", chatRoutes);

// Global Error Handler should be registered LAST
app.use(errorHandler);

export default app;
