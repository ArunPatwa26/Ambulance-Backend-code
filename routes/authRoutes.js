const express = require('express');
const { registerUser, loginUser, getAllUsers,getUserById,updateUser,getAllDrivers, deleteUserById } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/", getAllUsers);

router.get("/drivers", getAllDrivers);
// Get user by ID
router.get("/:userId", getUserById);

// Update user details
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUserById);

module.exports = router;
