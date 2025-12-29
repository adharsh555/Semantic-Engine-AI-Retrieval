import pool from "../config/db.js";

export const dbHealthCheck = async (req, res) => {
  try {
    const result = await pool.query("SELECT 1");
    res.json({
      status: "OK",
      database: "connected",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "ERROR",
      database: "not connected",
    });
  }
};
