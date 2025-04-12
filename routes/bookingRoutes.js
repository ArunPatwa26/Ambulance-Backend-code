const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Routes
router.post("/", bookingController.createBooking);
router.get("/:userId", bookingController.getBookingsByUserId);
router.get('/driver/:driverId', bookingController.getBookingsByDriverId);
router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
