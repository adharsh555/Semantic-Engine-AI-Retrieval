import "dotenv/config";
import app from "./app.js";
import { ensureSchema } from "./config/db.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await ensureSchema();
});
