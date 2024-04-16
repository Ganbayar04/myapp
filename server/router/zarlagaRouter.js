const express = require("express");
const router = express.Router();
const zarlagaController = require("../controller/zarlagaController.js");

router.post("/", zarlagaController.createZarlaga);
router.get("/", zarlagaController.getAllZarlaga);
router.get("/:id", zarlagaController.getZarlaga);
router.put("/:id", zarlagaController.updateZarlaga);
router.delete("/:id", zarlagaController.deleteZarlaga);

module.exports = router;
