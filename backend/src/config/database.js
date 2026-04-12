const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // 🔥 REQUIRED for Supabase
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected (Supabase)");
    client.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = {
  pool,
  connectDB,
};