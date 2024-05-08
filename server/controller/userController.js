const User = require("../models/usersModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require('../config/utils/email.js'); // Ensure this path is correct

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please enter your email address" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Hash the token and set to resetPasswordToken field for security
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    // Set token expiry time (1 hour)
    user.resetPasswordExpire = Date.now() + 3600000;

    await user.save();

    // Send the token to user's email
    const resetUrl = `http://yourfrontendaddress.com/password-reset/${resetToken}`;
    const message = `You are receiving this email because you have requested the reset of a password. Please use the following link to reset your password:\n\n${resetUrl}`;

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: message,
    });

    res.status(200).json({
      message: "A password reset token has been sent to your email address."
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Error sending the password reset email" });
  }
};

// Бүртгүүлэх
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    console.log("Хэрэглэгчийг амжилттай бүртгэлээ");
    res.status(201).json({
      message: "Хэрэглэгч амжилттай бүртгүүллээ",
      data: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Бүртгэлтэй хаягаар нэвтрэх
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "И-мэйл болон нууц үгээ оруулна уу" });
  }

  try {
    // Ensure the 'role' field is also selected here if it's not a default field in user schema
    const user = await User.findOne({ email }).select("+password +role");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "И-мэйл эсвэл нууц үг буруу байна!" });
    }
    console.log(`Нэвтэрсэн хэрэглэгч: ${user.email}, Role: ${user.role}`);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Include user role in the response so the client can use it
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: {
          id: user._id,
          username: user.email,
          role: user.role, // Include the role here
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Бүртгэлтэй хэрэглэгчид харах
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Хэрэглэгчийн id - р харах
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "хэрэглэгч олдсонгүй!..." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Хэрэглэгчийн мэдээлэл солих
exports.updateUser = async (req, res) => {
  const { password } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй!..." });
    }

    // Check if password needs to be updated
    if (password) {
      req.body.password = await bcrypt.hash(password, 12); // Hash new password
    }

    // Apply updates to the user
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");

    res.status(200).json({
      message: "Хэрэглэгчийн мэдээллийг амжилттай шинэчлэлээ",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Хэрэглэгч устгах
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      console.log("Хэрэглэгчийн мэдээлэл олдсонгүй!...");
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй!..." });
    }

    await user.deleteOne();
    console.log(
      `ID: ${user._id} useremail: (${user.email}) амжилттай устгалаа!...`
    );
    return res
      .status(200)
      .json({ message: "Хэрэглэгч амжилттай устгалаа!..." });

    res.status(204).send();
  } catch (error) {
    console.error("Хэрэглэгч устгах үед алдаа гарлаа:", error);
    res.status(500).json({ message: "Хэрэглэгчийг устгахад алдаа гарлаа!..." });
  }
};

