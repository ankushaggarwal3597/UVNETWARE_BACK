require("dotenv").config();

const http = require("http");
const app = require("./src/app");
const runMigrations = require("./src/config/migrate");

const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 🔥 Run migrations first
    await runMigrations();

    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);
    });

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();