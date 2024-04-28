const Dans = require("../models/dansModel");

// Create a new Dans
exports.createDans = async (req, res) => {
  try {
    const newDans = new Dans({
      name: req.body.name,
      uldegdel: req.body.uldegdel,
      tailbar: req.body.tailbar,
      accountStatus: req.body.accountStatus,
      user_id: req.body.user_id,
      account_id: req.body.account_id,
      turul_id: req.body.turul_id,
    });

    await newDans.save();
    res.status(201).json({
      message: "Данс амжилттай үүсгэлээ.",
      data: newDans,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Dans records
exports.getAllDans = async (req, res) => {
  try {
    const Dans = await dans.find().populate("user_id").populate("turul_id");
    res.status(200).json(Dans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Dans by ID
exports.getDansById = async (req, res) => {
  try {
    const Dans = await dans.findById(req.params.id)
      .populate("user_id")
      .populate("turul_id");
    if (!Dans) {
      return res
        .status(404)
        .json({ message: "Уучлаарай тухайн ID - тай данс олдсонгүй!" });
    }
    res.status(200).json(dans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Dans
exports.updateDans = async (req, res) => {
  try {
    const updatedDans = await dans.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedDans) {
      return res
        .status(404)
        .json({ message: "Уучлаарай тухайн ID - тай данс олдсонгүй!" });
    }
    res.status(200).json(updatedDans);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Dans
exports.deleteDans = async (req, res) => {
  try {
    const deletedDans = await dans.findByIdAndDelete(req.params.id);
    if (!deletedDans) {
      return res
        .status(404)
        .json({ message: "Уучлаарай тухайн ID - тай данс олдсонгүй!" });
    }
    res.status(200).json({ message: "Данс амжилттай устгагдлаа!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
