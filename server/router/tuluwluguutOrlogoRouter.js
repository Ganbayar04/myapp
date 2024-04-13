const express = require("express");
const router = express.Router();
const tuluwluguutOrlogoController = require("../controller/tuluwluguutOrlogoController.js");

router.post("/", tuluwluguutOrlogoController.createTuluwluguutOrlogo);
router.get("/", tuluwluguutOrlogoController.getAllTuluwluguutOrlogo);
router.get("/:id", tuluwluguutOrlogoController.getTuluwluguutOrlogo);
router.put("/:id", tuluwluguutOrlogoController.updateTuluwluguutOrlogo);
router.delete("/:id", tuluwluguutOrlogoController.deleteTuluwluguutOrlogo);

module.exports = router;
