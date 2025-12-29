import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";
import { apiLimiter } from "./utils/rateLimiter.js";

const app = express();

// Trust the Render proxy for rate limiting to work correctly
app.set("trust proxy", 1);

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean);
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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
