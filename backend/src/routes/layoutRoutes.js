const express = require("express");
const router = express.Router();

const layoutController = require("../controllers/layoutController");
const layoutSchema = require("../schemas/layoutSchema");
const validateRequest = require("../middlewares/validation");

router.post(
  "/",
  validateRequest(layoutSchema),
  layoutController.saveLayout
);

router.get("/", layoutController.getLayouts);
router.get("/:id", layoutController.getLayoutById);

module.exports = router;