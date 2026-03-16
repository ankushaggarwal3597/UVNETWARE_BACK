const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/database");
const { connectRedis } = require("./config/redis");

const layoutRoutes = require("./routes/layoutRoutes");
const eventRoutes = require("./routes/eventRoutes");
//const seatRoutes = require("./routes/seatRoutes");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
connectRedis();

app.use("/api/layouts", layoutRoutes);
app.use("/api/events", eventRoutes);
//app.use("/api/seats", seatRoutes);

app.get("/", (req, res) => {
  res.send("UVNetware Backend Running");
});

app.use(errorHandler);

module.exports = app;