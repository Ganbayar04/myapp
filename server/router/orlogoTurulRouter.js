const express = require("express");
const router = express.Router();
const orlogoTurulController = require("../controller/orlogoTurulController.js");

router.post("/", orlogoTurulController.createOrlogoTurul);
router.get("/", orlogoTurulController.getAllOrlogoTurul);
router.get("/:id", orlogoTurulController.getOrlogoTurul);
router.put("/:id", orlogoTurulController.updateOrlogoTurul);
router.delete("/:id", orlogoTurulController.deleteOrlogoTurul);

module.exports = router;
