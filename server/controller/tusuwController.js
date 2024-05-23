const Tusuw = require("../models/tusuwModel.js");

// Төсөв үүсгэх
exports.createTusuw = async (req, res) => {
  try {
    const newTusuw = await Tusuw.create(req.body);
    console.log("Төсөв амжилттай үүсгэлээ.");
    res.status(201).json({
      message: "Төсөв амжилттай үүсгэлээ.",
      data: {
        id: newTusuw._id,
        name: newTusuw.name,
        year: newTusuw.year,
        month: newTusuw.month,
        tuluw: newTusuw.tuluw,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Төсвүүд харах
exports.getAllTusuw = async (req, res) => {
  try {
    const tusuws = await Tusuw.find();
    res.status(200).json(tusuws);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ID-аар төсөв авах
exports.getTusuwByUserId = async (req, res) => {
  try {
    const tusuws = await Tusuw.find({ user_id: req.params.user_id });
    if (!tusuws.length) {
      return res.status(404).json({ message: "Уучлаарай!. уг төсөв олдсонгүй." });
    }
    res.status(200).json(tusuws);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ID-р төсөв харах
exports.getTusuw = async (req, res) => {
  try {
    const tusuw = await Tusuw.findById(req.params.id);
    if (!tusuw) {
      return res.status(404).json({ message: "Уучлаарай!. уг төсөв олдсонгүй." });
    }
    res.status(200).json(tusuw);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Төсвийн мэдээлэл солих
exports.updateTusuw = async (req, res) => {
  try {
    const updatedTusuw = await Tusuw.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTusuw) {
      return res.status(404).json({ message: "Уучлаарай!. уг төсөв олдсонгүй." });
    }
    res.status(200).json({
      message: "Төсвийн мэдээлэл амжилттай солигдлоо.",
      data: {
        id: updatedTusuw._id,
        name: updatedTusuw.name,
        year: updatedTusuw.year,
        month: updatedTusuw.month,
        tuluw: updatedTusuw.tuluw,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Төсөв устгах
exports.deleteTusuw = async (req, res) => {
  try {
    const deletedTusuw = await Tusuw.findByIdAndDelete(req.params.id);
    if (!deletedTusuw) {
      return res.status(404).json({ message: "Уучлаарай!. уг төсөв олдсонгүй." });
    }
    res.status(200).json({ message: "Төсвийг амжилттай устгалаа." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
