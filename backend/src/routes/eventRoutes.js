const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");
const eventSchema = require("../schemas/eventSchema");
const validateRequest = require("../middlewares/validation");
const seatController = require("../controllers/seatController");

router.post("/", validateRequest(eventSchema), eventController.createEvent);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);
router.get("/:eventId/seat-map", seatController.getSeatMap);

module.exports = router;
