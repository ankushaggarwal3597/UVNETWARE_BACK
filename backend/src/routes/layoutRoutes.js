const express = require("express");
const router = express.Router();

const layoutController = require("../controllers/layoutController");
const layoutSchema = require("../schemas/layoutSchema");
const validateRequest = require("../middlewares/validation");
const seatController = require("../controllers/seatController");
const seatService = require("../services/seatService");

// create layout
router.post(
  "/",
  validateRequest(layoutSchema),
  layoutController.saveLayout
);

// get layouts
router.get("/", layoutController.getLayouts);
router.get("/:id", layoutController.getLayoutById);

// generate seats
router.post(
  "/:layoutId/generate-seats",
  seatController.generateSeats
);

// get seat map
router.get("/:layoutId/seat-map", seatController.getSeatMap);

module.exports = router;