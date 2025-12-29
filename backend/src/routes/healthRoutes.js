import express from "express";
import { dbHealthCheck } from "../controllers/healthController.js";

const router = express.Router();

router.get("/db", dbHealthCheck);

export default router;
