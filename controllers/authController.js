const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phoneNo, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "User already exists" });

    // Check if phone number already exists
    const phoneExists = await User.findOne({ phoneNo });
    if (phoneExists) return res.status(400).json({ error: "Phone number already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ name, email, phoneNo, password: hashedPassword, role });

    if (user) {
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNo: user.phoneNo,
          role: user.role,
          token: generateToken(user._id),
        }
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
};

// @desc Login user & get token
// @route POST /api/auth/login
// @access Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // Respond with user details & token
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo,
        role: user.role,
        token: generateToken(user._id),
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error logging in user" });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from response
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// @desc Get user by ID
// @route GET /api/users/:userId
// @access Private
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

// @desc Update user details
// @route PUT /api/users/:userId
// @access Private (User/Admin)
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phoneNo, password, role } = req.body;

    let updatedData = { name, email, phoneNo, role };

    // Hash new password if provided
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    // console.log("Fetching all drivers..."); // Debugging log

    const drivers = await User.find({ role: "Driver" }).select("-password");

    if (!drivers.length) {
      return res.status(404).json({ message: "No drivers found" });
    }

    res.status(200).json({ drivers });
  } catch (error) {
    console.error("Error fetching drivers:", error); // Log exact error
    res.status(500).json({ error: "Error fetching drivers", details: error.message });
  }
};


exports.deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find and delete user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user", details: error.message });
  }
};
