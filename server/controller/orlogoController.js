const Orlogo = require("../models/orlogoModel.js");

exports.createOrlogo = async (req, res) => {
  try {
    const newOrlogo = await Orlogo.create(req.body);
    console.log("Орлого амжилттай үүсгэлээ.");
    res.status(201).json({
      message: "Орлого амжилттай үүсгэлээ.",
      data: {
        id: newOrlogo._id,
        name: newOrlogo.name,
        dans_id: newOrlogo.dans_id,
        orlogo_turul_id: newOrlogo.orlogo_turul_id,
        t_orlogo_id: newOrlogo.t_orlogo_id,
        dun: newOrlogo.dun,
        tailbar: newOrlogo.tailbar,
        ognoo: newOrlogo.ognoo,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrlogo = async (req, res) => {
  try {
    const orlogo = await Orlogo.find();
    res.status(200).json(orlogo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrlogo = async (req, res) => {
  try {
    const orlogo = await Orlogo.findById(req.params.id);
    if (!orlogo) {
      return res.status(404).json({
        message: "Уучлаарай тухайн ID - тай орлого олдсонгүй!...",
      });
    }
    res.status(200).json(orlogo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrlogo = async (req, res) => {
  try {
    const updatedOrlogo = await Orlogo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedOrlogo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrlogo = async (req, res) => {
  try {
    const orlogo = await Orlogo.findByIdAndDelete(req.params.id);
    console.log("Орлого амжилттай устгалаа.");
    if (!orlogo) {
      return res
        .status(404)
        .json({ message: "Уучлаарай тухайн ID - тай орлого олдсонгүй!..." });
    }
    res.status(200).json({ message: "Орлого амжилттай устгалаа..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
