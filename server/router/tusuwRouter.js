const express = require("express");
const router = express.Router();
const tusuwController = require("../controller/tusuwController.js");

router.post("/", tusuwController.createTusuw);
router.get("/", tusuwController.getAllTusuw);
router.get("/user/:user_id", tusuwController.getTusuwByUserId);  // Changed to /user/:user_id
router.get("/:id", tusuwController.getTusuw);
router.put("/:id", tusuwController.updateTusuw);
router.delete("/:id", tusuwController.deleteTusuw);

module.exports = router;
