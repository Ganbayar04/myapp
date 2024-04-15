const express = require("express");
const router = require.Router();
const orlogoController = require("../controller/orlogoController.js");

router.post("/", orlogoController.createOrlogo);
router.get("/", orlogoController.getAllOrlogo);
router.get("/:id", orlogoController.getOrlogo);
router.put("/:id", orlogoController.updateOrlogo);
router.delete("/:id", orlogoController.deleteOrlogo);

module.exports = router;
