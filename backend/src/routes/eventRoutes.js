const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");
const eventSchema = require("../schemas/eventSchema");
const validateRequest = require("../middlewares/validation");

router.post("/", validateRequest(eventSchema), eventController.createEvent);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);

module.exports = router;
