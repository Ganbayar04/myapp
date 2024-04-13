const express = require("express");
const router = express.Router();
const tusuwController = require("../controller/tusuwController.js");

router.post("/", tusuwController.createTusuw);
router.get("/", tusuwController.getAllTusuws);
router.get("/:id", tusuwController.getTusuw);
router.put("/:id", tusuwController.updateTusuw);
router.delete("/:id", tusuwController.deleteTusuw);

module.exports = router;
