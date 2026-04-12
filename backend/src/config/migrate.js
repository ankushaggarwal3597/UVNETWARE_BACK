const knex = require("knex");
const config = require("../../knexfile");

const db = knex(config.development);

const runMigrations = async () => {
  try {
    console.log("🔄 Running migrations...");
    await db.migrate.latest();
    console.log("✅ Migrations applied");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  }
};

module.exports = runMigrations;