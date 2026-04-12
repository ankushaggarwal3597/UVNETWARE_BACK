require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,

      // 🔥 REQUIRED for Supabase
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: "./src/migrations",
    },
  },
};