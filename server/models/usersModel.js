const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

// Өгөгдлийн санд хадгалахаасаа өмнө нууц үгээ хэш болгох
userSchema.pre("save", async function (next) {
  // Зөвхөн өөрчилсөн (эсвэл шинэ) нууц үгийг хэш болгох
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
