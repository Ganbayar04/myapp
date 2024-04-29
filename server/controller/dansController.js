const Dans = require("../models/dansModel"); // Correct import of the Dans model

// Create a new Dans
exports.createDans = async (req, res) => {
  try {
    const newDans = new Dans({
      name: req.body.name,
      uldegdel: req.body.uldegdel,
      tailbar: req.body.tailbar,
      accountStatus: req.body.accountStatus,
      user_id: req.body.user_id,
      turul_id: req.body.turul_id,
    });

    await newDans.save();
    res.status(201).json({
      message: "Данс амжилттай үүсгэлээ.",
      data: newDans,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Dans records
exports.getAllDans = async (req, res) => {
  try {
    const dans = await Dans.find().populate("user_id").populate("turul_id");
    res.status(200).json(dans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Dans by ID
exports.getDansById = async (req, res) => {
  try {
    const dans = await Dans.findById(req.params.id)
      .populate("user_id")
      .populate("turul_id");
    if (!dans) {
      return res
        .status(404)
        .json({ message: "Уучлаарай тухайн ID - тай данс олдсонгүй!" });
    }
    res.status(200).json(dans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Example of a controller method to get all accounts associated with a user ID
exports.getAllDansByUserId = async (req, res) => {
  const userId = req.params.userId; // Extract the user ID from the request parameters

  try {
    // Fetch all accounts that belong to the specified user ID
    const dans = await Dans.find({ user_id: userId });

    // Check if any accounts were found
    if (dans.length > 0) {
      res.status(200).json(dans); // Return the accounts if found
    } else {
      res.status(404).json({ message: 'No  found for this user ID' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

// Update a Dans
exports.updateDans = async (req, res) => {
  try {
    const updatedDans = await Dans.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedDans) {
      return res
        .status(404)
        .json({ message: "Уучлаарай тухайн ID - тай данс олдсонгүй!" });
    }
    res.status(200).json(updatedDans);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Dans
exports.deleteDans = async (req, res) => {
  try {
    const deletedDans = await Dans.findByIdAndDelete(req.params.id);
    if (!deletedDans) {
      return res
        .status(404)
        .json({ message: "Уучлаарай тухайн ID - тай данс олдсонгүй!" });
    }
    res.status(200).json({ message: "Данс амжилттай устгагдлаа!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
