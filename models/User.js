const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  phoneNo: { type: String, required: true, unique: true, trim: true }, // New Field Added
  password: { type: String, required: true },
  role: { type: String, enum: ["User", "Admin", "Driver"], default: "User" },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
