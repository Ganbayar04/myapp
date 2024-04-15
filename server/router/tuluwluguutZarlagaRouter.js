const express = require("express");
const router = express.router();
const tuluwluguutZarlagaController = require("../controller/tuluwluguutZarlagaController.js");

router.post("/", tuluwluguutZarlagaController.createTuluwluguutZarlaga);
router.get("/", tuluwluguutZarlagaController.getAllTuluwluguutZarlaga);
router.get("/:id", tuluwluguutZarlagaController.getTuluwluguutZarlaga);
router.put("/:id", tuluwluguutZarlagaController.updateTuluwluguutZarlaga);
router.delete("/:id", tuluwluguutZarlagaController.deleteTuluwluguutZarlaga);

module.exports = router;
