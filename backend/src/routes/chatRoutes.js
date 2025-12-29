import express from "express";
import { handleChat } from "../controllers/chatController.js";

const router = express.Router();

// Entry point for RAG-based chat
router.post("/", handleChat);

export default router;
