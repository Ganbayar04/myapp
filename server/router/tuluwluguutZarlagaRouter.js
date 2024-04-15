const express = require("express");
const router = express.Router();
const tuluwluguutZarlagaController = require("../controller/tuluwluguutZarlagaController.js");

router.post("/", tuluwluguutZarlagaController.createTuluwluguutZarlaga);
router.get("/", tuluwluguutZarlagaController.getAllTuluwluguutZarlaga);
router.get("/:id", tuluwluguutZarlagaController.getTuluwluguutZarlaga);
router.put("/:id", tuluwluguutZarlagaController.updateTululuguutZarlaga);
router.delete("/:id", tuluwluguutZarlagaController.deleteTuluwluguutZarlaga);

module.exports = router;
