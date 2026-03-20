const express = require("express");
const router = express.Router();

const seatController = require("../controllers/seatController");

console.log("seatController:", seatController);

router.get("/:eventId/seat-map", seatController.getSeatMap);

module.exports = router;
