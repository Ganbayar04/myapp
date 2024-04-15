const express = require("express");
const router = express.Router();
const zarlagaTurulController = require("../controller/zarlagaTurulController.js");

router.post("/", zarlagaTurulController.createzarlagaTurul);
router.get("/", zarlagaTurulController.getAllzarlagaTurul);
router.get("/:id", zarlagaTurulController.getzarlagaTurul);
router.put("/:id", zarlagaTurulController.updatezarlagaTurul);
router.delete("/:id", zarlagaTurulController.deletezarlagaTurul);

module.exports = router;
