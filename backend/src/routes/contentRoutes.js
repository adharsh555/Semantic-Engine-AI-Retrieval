import express from "express";
import { addContent, listContents } from "../controllers/contentController.js";

const router = express.Router();

router.post("/", addContent);
router.get("/", listContents);

export default router;
