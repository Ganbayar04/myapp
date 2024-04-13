const TuluwluguutOrlogo = require("../models/tuluwluguutOrlogoModel.js");

exports.createTuluwluguutOrlogo = async (req, res) => {
  try {
    const newTuluwluguutOrlogo = await TuluwluguutOrlogo.create(req.body);
    console.log("Төлөвлөгөөт орлого амжилттай үүсгэлээ.");
    res.status(201).json({
      message: "Төлөвлөгөөт орлого амжилттай үүсгэлээ.",
      data: {
        id: newTuluwluguutOrlogo._id,
        name: newTuluwluguutOrlogo.name,
        tailbar: newTuluwluguutOrlogo.tailbar,
        dun: newTuluwluguutOrlogo.dun,
        tusuw_id: newTuluwluguutOrlogo.tusuw_id,
        guitsetgel: newTuluwluguutOrlogo.guitsetgel,
      },
    });
  } catch (error) {
    console.log("error");
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTuluwluguutOrlogo = async (req, res) => {
  try {
    const TuluwluguutOrlogo = await TuluwluguutOrlogo.find().populate(
      "tusuw_id"
    );
    res.status(200).json(TuluwluguutOrlogo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getTuluwluguutOrlogo = async (req, res) => {
  try {
    const TuluwluguutOrlogo = await TuluwluguutOrlogo.findById(
      req.params.id
    ).populate("tusuw_id");
    if (!TuluwluguutOrlogo) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! төлөвлөгөөт орлого олдсонгүй." });
    }
    res.status(200).json(TuluwluguutOrlogo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTuluwluguutOrlogo = async (req, res) => {
  try {
    const updatedTuluwluguutOrlogo = await TuluwluguutOrlogo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!TuluwluguutOrlogo) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! төлөвлөгөөт орлого олдсонгүй." });
    }
    res.status(200).json({
      message: "Төлөвлөгөөт орлогын мэдээлэл амжилттай солигдлоо.",
      data: {
        id: updatedTuluwluguutOrlogo._id,
        name: updatedTuluwluguutOrlogo.name,
        tailbar: updatedTuluwluguutOrlogo.tailbar,
        dun: updatedTuluwluguutOrlogo.dun,
        tusuw_id: updatedTuluwluguutOrlogo.tusuw_id,
        guitsetgel: updatedTuluwluguutOrlogo.guitsetgel,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTuluwluguutOrlogo = async (req, res) => {
  try {
    const TuluwluguutOrlogo = await TuluwluguutOrlogo.findByIdAndDelete(
      req.params.id
    );
    if (!plannedIncome) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! төлөвлөгөөт орлого олдсонгүй." });
    }
    res.status(204).json({ message: "Амжилттай устгалаа." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
