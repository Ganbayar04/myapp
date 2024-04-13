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
