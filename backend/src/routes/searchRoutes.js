import express from "express";
import { searchContent } from "../controllers/searchController.js";

const router = express.Router();

/**
 * @route GET /api/search
 * @desc Search content semantically using vector similarity
 */
router.get("/", searchContent);

export default router;
