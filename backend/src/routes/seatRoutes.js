const express = require("express");
const router = express.Router();

const seatController = require("../controllers/seatController");

router.post("/hold", seatController.holdSeat);
router.post("/book", seatController.bookSeat);
router.delete("/release", seatController.releaseSeat);

module.exports = router;


