const express = require("express");
const router = express.Router();

const seatController = require("../controllers/holdController");

// stt
const auth = require('../middlewares/auth');

router.post("/hold", auth, seatController.holdSeat);
router.post("/book", auth, seatController.bookSeat);
router.delete("/release", auth, seatController.releaseSeat);
// end

// router.post("/hold", seatController.holdSeat);
// router.post("/book", seatController.bookSeat);
// router.delete("/release", seatController.releaseSeat);

module.exports = router;


