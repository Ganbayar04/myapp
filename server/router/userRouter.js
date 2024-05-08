const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");
const { protect } = require("../Middleware/authMiddleware.js");

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/forgot-password", userController.forgotPassword);

module.exports = router;
