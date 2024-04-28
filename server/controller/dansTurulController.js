const DansTurul = require("../models/dansTurulModel");

// Create a new DansTurul
exports.createDansTurul = async (req, res) => {
  try {
    const newDansTurul = await DansTurul.create(req.body);
    res.status(201).json({
      message: "DansTurul created successfully.",
      data: newDansTurul,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all DansTurul records
exports.getAllDansTurul = async (req, res) => {
  try {
    const allDansTurul = await DansTurul.find();
    res.status(200).json(allDansTurul);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single DansTurul by ID
exports.getDansTurul = async (req, res) => {
  try {
    const dansTurul = await DansTurul.findById(req.params.id);
    if (!dansTurul) {
      return res.status(404).json({ message: "DansTurul not found." });
    }
    res.status(200).json(dansTurul);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE controller for DansTurul
exports.deleteDansTurul = async (req, res) => {
  try {
    const result = await DansTurul.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "DansTurul not found" });
    }
    res.status(200).json({ message: "DansTurul deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
