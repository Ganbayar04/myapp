const Dans = require("../models/dansModel.js");

// Данс үүсгэх
exports.createDans = async (req, res) => {
  try {
    const newDans = await Dans.create(req.body);
    console.log("Данс амжилттай үүсгэлээ.");
    res.status(201).json({
      message: "Данс амжилттай үүсгэлээ.",
      data: {
        id: newDans._id,
        name: newDans.name,
        turul_id: newDans.turul_id,
        uldegdel: newDans.uldegdel,
        tailbar: newDans.tailbar,
        accounStatus: newDans.accountStatus,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Үүссэн бүх данс харах
exports.getAllDans = async (req, res) => {
  try {
    const userId = req.query.userId; // Fetching userId from query parameters
    const query = userId ? { user_id: userId } : {}; // Corrected to use user_id, which matches your schema
    console.log("Query used for finding accounts:", query); // Log must be after 'query' is defined

    const dans = await Dans.find(query);
    if (dans.length === 0) {
      console.log("No accounts found for user ID:", userId); // Log for debugging
    }
    res.status(200).json(dans);
  } catch (error) {
    console.log(
      "Failed to fetch accounts for user ID:",
      userId,
      "with error:",
      error
    ); // Log detailed error
    res.status(500).json({ message: error.message });
  }
};

// данс ID - р харах
exports.getDans = async (req, res) => {
  try {
    const dans = await Dans.findById(req.params.id).populate("turul_id");
    if (!dans) {
      return res
        .status(404)
        .json({ message: "Уучлаарай тухайн ID - тай данс олдсонгүй!..." });
    }
    res.status(200).json(dans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// дансны мэдээлэл солих
exports.updateDans = async (req, res) => {
  try {
    const updatedDans = await Dans.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedDans);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// үүсгэсэн данс устгах
exports.deleteDans = async (req, res) => {
  try {
    const dans = await Dans.findByIdAndDelete(req.params.id);
    console.log("Данс амжилттай устгагдлаа!...");
    if (!dans) {
      return res
        .status(404)
        .json({ message: "Уучлаарай тухайн ID - тай данс олдсонгүй!..." });
    }
    res.status(200).json({ message: "Данс амжилттай устгагдлаа!..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
