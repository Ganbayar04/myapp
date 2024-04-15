const ZarlagaTurul = require("../models/zarlagaTurulModel.js");

exports.createZarlagaTurul = async (req, res) => {
  try {
    const newZarlagaTurul = await ZarlagaTurul.create(req.body);
    console.log("Зарлагын төрөл амжилттай үүсгэлээ.");
    res.status(201).json({
      message: "Зарлагын төрөл амжилттай үүсгэлээ.",
      data: {
        id: newZarlagaTurul._id,
        name: newZarlagaTurul.name,
      },
    });
  } catch (error) {
    console.log("error");
    res.status(400).json({ message: error.message });
  }
};

exports.getAllZarlagaTurul = async (req, res) => {
  try {
    const allZturul = await ZarlagaTurul.find();
    res.status(200).json(allZturul);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getZarlagaTurul = async (req, res) => {
  try {
    const oneZturul = await ZarlagaTurul.findById(req.params.id);
    if (!oneZturul) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! орлогын төрөл олдсонгүй." });
    }
    res.status(200).json(oneZturul);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateZarlagaTurul = async (req, res) => {
  try {
    const updatedZarlagaTurul = await ZarlagaTurul.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!ZarlagaTurul) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! зарлагын төрөл олдсонгүй." });
    }
    res.status(200).json({
      message: "Зарлагын төрлийн мэдээлэл амжилттай солигдлоо.",
      data: {
        id: updatedZarlagaTurul._id,
        name: updatedZarlagaTurul.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteZarlagaTurul = async (req, res) => {
  try {
    const deletedZturul = await ZarlagaTurul.findByIdAndDelete(req.params.id);
    if (!deletedZturul) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! зарлагын төрөл олдсонгүй." });
    }
    res.status(200).json({ message: "Амжилттай устгалаа." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
