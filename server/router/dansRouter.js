const express = require("express");
const router = express.Router();
const {
  createDans,
  getAllDans,
  getDansById, // This should match the export
  updateDans,
  deleteDans,
} = require("../controller/dansController"); // Make sure the path is correct

router.post("/", createDans);
router.get("/", getAllDans);
router.get("/:id", getDansById); // Use getDansById
router.put("/:id", updateDans);
// Make sure updateAccountStatus is defined or remove the following line if not used
// router.put("/updateStatus/:id", updateAccountStatus);
router.delete("/:id", deleteDans);

module.exports = router;
