const DansTurul = require("../models/dansTurulModel.js"); // Adjust the import path as needed

exports.createDansTurul = async (req, res) => {
  try {
    const newDansTurul = await DansTurul.create(req.body);
    console.log("Төрөл амжилттай үүсгэлээ.");
    res.status(201).json({
      message: "Төрөл амжилттай үүсгэлээ.",
      data: {
        id: newDansTurul._id,
        name: newDansTurul.name,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllDansTurul = async (req, res) => {
  try {
    const dansTurul = await DansTurul.find();
    res.status(200).json(dansTurul);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDansTurul = async (req, res) => {
  try {
    const dansTurul = await DansTurul.findById(req.params.id);
    if (!dansTurul) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! Хайсан төрөл олдсонгүй!... " });
    }
    res.status(200).json(dansTurul);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDansTurul = async (req, res) => {
  try {
    const updatedDansTurul = await DansTurul.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDansTurul) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! Төрөл олдсонгүй!..." });
    }
    res.status(200).json({
      message: "Мэдээлэл амжилттай солигдлоо",
      data: {
        id: updatedDansTurul._id,
        name: updatedDansTurul.name,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDansTurul = async (req, res) => {
  try {
    const deletedDansTurul = await DansTurul.findByIdAndDelete(req.params.id);
    console.log("Төрөл амжилттай устгалаа!...");
    if (!deletedDansTurul) {
      return res.status(404).json({
        message: "Тухайн төрөл олдсонгүй!. Та устгасан байж болзошгүй...",
      });
    }
    res.status(200).json({ message: "Төрөл амжилттай устгалаа!..." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
