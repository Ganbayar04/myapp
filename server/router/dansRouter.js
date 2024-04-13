const express = require("express");
const router = express.Router();
const dansController = require("../controller/dansController.js");

router.post("/", dansController.createDans);
router.get("/", dansController.getAllDans);
router.get("/:id", dansController.getDans);
router.put("/:id", dansController.updateDans);
router.delete("/:id", dansController.deleteDans);

module.exports = router;
