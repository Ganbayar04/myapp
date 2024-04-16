const Zarlaga = require("../models/zarlagaModel.js");

exports.createZarlaga = async (req, res) => {
  try {
    const newZarlaga = await Zarlaga.create(req.body);
    console.log("Зарлага амжилттай үүсгэлээ.");
    res.status(201).json({
      message: "Зарлага амжилттай үүсгэлээ.",
      data: {
        id: newZarlaga._id,
        name: newZarlaga.name,
        dans_id: newZarlaga.dans_id,
        zarlaga_turul_id: newZarlaga.zarlaga_turul_id,
        t_zarlaga_id: newZarlaga.t_zarlaga_id,
        dun: newZarlaga.dun,
        tailbar: newZarlaga.tailbar,
        ognoo: newZarlaga.ognoo,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllZarlaga = async (req, res) => {
  try {
    const zarlaga = await Zarlaga.find();
    res.status(200).json(zarlaga);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getZarlaga = async (req, res) => {
  try {
    const zarlaga = await Zarlaga.findById(req.params.id);
    if (!zarlaga) {
      return res.status(404).json({
        message: "Уучлаарай тухайн ID - тай зарлага олдсонгүй!...",
      });
    }
    res.status(200).json(zarlaga);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateZarlaga = async (req, res) => {
  try {
    const updatedZarlaga = await Zarlaga.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedZarlaga) {
      return res
        .status(404)
        .json({ message: "Уучлаарай тухайн ID - тай зарлага олдсонгүй!..." });
    }
    res.status(200).json(updatedZarlaga);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteZarlaga = async (req, res) => {
  try {
    const zarlaga = await Zarlaga.findByIdAndDelete(req.params.id);
    console.log("Зарлага амжилттай устгалаа.");
    if (!zarlaga) {
      return res
        .status(404)
        .json({ message: "Уучлаарай тухайн ID - тай зарлага олдсонгүй!..." });
    }
    res.status(200).json({ message: "Зарлага амжилттай устгалаа..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
