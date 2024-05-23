const express = require("express");
const router = express.Router();
const tuluwluguutZarlagaController = require("../controller/tuluwluguutZarlagaController.js");

router.post("/", tuluwluguutZarlagaController.createTuluwluguutZarlaga);
router.get("/", tuluwluguutZarlagaController.getAllTuluwluguutZarlaga);
router.get("/:id", tuluwluguutZarlagaController.getTuluwluguutZarlaga);
router.get("/tusuw/:tusuw_id", tuluwluguutZarlagaController.getZarlagaBytusuwid);
router.put("/:id", tuluwluguutZarlagaController.updateTululuguutZarlaga);
router.delete("/:id", tuluwluguutZarlagaController.deleteTuluwluguutZarlaga);

module.exports = router;
