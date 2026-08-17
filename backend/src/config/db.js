import pkg from "pg";
import fs from "fs";
import path from "path";

const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    }
    : {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }
);

export const ensureSchema = async () => {
  try {
    const schemaPath = path.join(process.cwd(), "src", "db", "schema", "001_create_contents.sql");
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, "utf8");
      await pool.query(sql);
      console.log("✅ PostgreSQL schema & pgvector extension verified.");
    }
  } catch (err) {
    console.error("⚠️ Database schema notice:", err.message);
  }
};

export default pool;
