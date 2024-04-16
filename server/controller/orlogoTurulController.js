const OrlogoTurul = require("../models/orlogoTurulModel.js");

exports.createOrlogoTurul = async (req, res) => {
  try {
    const newOrlogoTurul = await OrlogoTurul.create(req.body);
    console.log("Орлогын төрөл амжилттай үүсгэлээ.");
    res.status(201).json({
      message: "Орлогын төрөл амжилттай үүсгэлээ.",
      data: {
        id: newOrlogoTurul._id,
        name: newOrlogoTurul.name,
      },
    });
  } catch (error) {
    console.log("error");
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrlogoTurul = async (req, res) => {
  try {
    const allOturul = await OrlogoTurul.find();
    res.status(200).json(allOturul);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getOrlogoTurul = async (req, res) => {
  try {
    const oneOturul = await OrlogoTurul.findById(req.params.id);
    if (!oneOturul) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! орлогын төрөл олдсонгүй." });
    }
    res.status(200).json(oneOturul);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrlogoTurul = async (req, res) => {
  try {
    const updatedOrlogoTurul = await OrlogoTurul.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!OrlogoTurul) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! орлогын төрөл олдсонгүй." });
    }
    res.status(200).json({
      message: "Орлого төрлийн мэдээлэл амжилттай солигдлоо.",
      data: {
        id: updatedOrlogoTurul._id,
        name: updatedOrlogoTurul.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrlogoTurul = async (req, res) => {
  try {
    const deletedOturul = await OrlogoTurul.findByIdAndDelete(req.params.id);
    if (!deletedOturul) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! орлогын төрөл олдсонгүй." });
    }
    res.status(200).json({ message: "Амжилттай устгалаа." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
