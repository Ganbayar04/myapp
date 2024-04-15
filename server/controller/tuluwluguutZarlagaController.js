const TuluwluguutZarlaga = require("../models/tuluwluguutZarlagaModel.js");

exports.createTuluwluguutZarlaga = async (req, res) => {
  try {
    const newTuluwluguutZarlaga = await TuluwluguutZarlaga.create(req.body);
    console.log(" Төлөвлөгөөт зарлага амжилттай үүсгэлээ.");
    res.status(201).json({
      message: "Төлөвлөгөөт зарлага амжилттай үүсгэлээ.",
      data: {
        id: newTuluwluguutZarlaga._id,
        name: newTuluwluguutZarlaga.name,
        tailbar: newTuluwluguutZarlaga.tailbar,
        dun: newTuluwluguutZarlaga.dun,
        tusuw_id: newTuluwluguutZarlaga.tusuw_id,
        guitsetgel: newTuluwluguutZarlaga.guitsetgel,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTuluwluguutZarlaga = async (req, res) => {
  try {
    const allZarlaga = await TuluwluguutZarlaga.find().populate("tusuw_id");
    res.status(200).json(allZarlaga);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getTuluwluguutZarlaga = async (req, res) => {
  try {
    const oneZarlaga = await TuluwluguutZarlaga.findById(
      req.params.id
    ).populate("tusuw_id");
    if (!oneZarlaga) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! төлөвлөгөөт зарлага олдсонгүй." });
    }
    res.status(200).json(oneZarlaga);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateTululuguutZarlaga = async (req, res) => {
  try {
    const updatedTuluwluguutZarlaga =
      await TuluwluguutZarlaga.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    if (!TuluwluguutZarlaga) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! төлөвлөгөөт зарлага олдсонгүй." });
    }
    res.status(200).json({
      message: "Төлөвлөгөөт зарлагын мэдээлэл амжилттай солигдлоо.",
      data: {
        id: updatedTuluwluguutZarlaga._id,
        name: updatedTuluwluguutZarlaga.name,
        tailbar: updatedTuluwluguutZarlaga.tailbar,
        dun: updatedTuluwluguutZarlaga.dun,
        tusuw_id: updatedTuluwluguutZarlaga.tusuw_id,
        guitsetgel: updatedTuluwluguutZarlaga.guitsetgel,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTuluwluguutZarlaga = async (req, res) => {
  try {
    const deletedZarlaga = await TuluwluguutZarlaga.findByIdAndDelete(
      req.params.id
    );
    if (!deletedZarlaga) {
      return res
        .status(404)
        .json({ message: "Уучлаарай! төлөвлөгөөт зарлага олдсонгүй." });
    }
    res.status(200).json({ message: "Амжилттай устгалаа." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
