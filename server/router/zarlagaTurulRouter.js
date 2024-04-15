const express = require("express");
const router = express.Router();
const zarlagaTurulController = require("../controller/zarlagaTurulController.js");

router.post("/", zarlagaTurulController.createZarlagaTurul);
router.get("/", zarlagaTurulController.getAllZarlagaTurul);
router.get("/:id", zarlagaTurulController.getZarlagaTurul);
router.put("/:id", zarlagaTurulController.updateZarlagaTurul);
router.delete("/:id", zarlagaTurulController.deleteZarlagaTurul);

module.exports = router;
