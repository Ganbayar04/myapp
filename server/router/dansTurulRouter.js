const express = require("express");
const router = express.Router();
const dansTurulController = require("../controller/dansTurulController.js"); // Adjust the import path as needed

router.post("/", dansTurulController.createDansTurul);
router.get("/", dansTurulController.getAllDansTurul);
router.get("/:id", dansTurulController.getDansTurul);
//router.put("/:id", dansTurulController.updateDansTurul);
router.delete("/:id", dansTurulController.deleteDansTurul);

module.exports = router;
