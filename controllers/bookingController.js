const Booking = require("../models/Booking");
const Ambulance = require("../models/Ambulance");
const nodemailer = require("nodemailer");

// Send Email Function
// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arunpatwa2605@gmail.com",
    pass: "upzh vpnt qcqn cgup",
  },
});

// Function to send email based on booking status
const sendBookingEmail = async (email, name, booking, status) => {
  let subject = "";
  let message = "";

  if (status === "Confirmed") {
    subject = "🚑 Your Ambulance Booking is Confirmed!";
    message = `
      <h2 style="color: #007bff; text-align: center;">🚑 Emergency Ambulance Service</h2>
      <hr style="border-top: 1px solid #ddd;">
      <p>Dear <strong>${name}</strong>,</p>
      <p>We are pleased to inform you that your ambulance booking has been <strong style="color: green;">confirmed</strong>.</p>

      <h3 style="color: #007bff;">📌 Booking Details:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Pickup Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.pickupLocation}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Drop Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.dropLocation}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Emergency Type:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.emergencyType || "General"}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Assigned Ambulance:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.ambulanceId ? booking.ambulanceId.numberPlate : "N/A"}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Assigned Driver:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.driverId ? booking.driverId.name : "N/A"}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Status:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd; color: green;"><strong>Confirmed</strong></td></tr>
      </table>

      <p>If you need further assistance, please contact our support team.</p>
      <p>Thank you for trusting our <strong>Emergency Ambulance Service</strong>.</p>
      <p style="text-align: center; color: #777; font-size: 14px;">🚑 Stay Safe, Stay Healthy! 🚑</p>
    `;
  } else if (status === "Completed") {
    subject = "✅ Your Ambulance Service is Completed Successfully!";
    message = `
      <h2 style="color: #007bff; text-align: center;">🚑 Emergency Ambulance Service</h2>
      <hr style="border-top: 1px solid #ddd;">
      <p>Dear <strong>${name}</strong>,</p>
      <p>Your ambulance service has been successfully <strong style="color: green;">completed</strong>.</p>
      <p>We hope we were able to provide you with a seamless and timely service.</p>

      <h3 style="color: #007bff;">📌 Service Details:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Pickup Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.pickupLocation}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Drop Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.dropLocation}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Service Status:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd; color: green;"><strong>Completed</strong></td></tr>
      </table>

      <p>We would love to hear your feedback! Please take a moment to share your experience with us.</p>
      <p>Thank you for choosing our <strong>Emergency Ambulance Service</strong>.</p>
      <p style="text-align: center; color: #777; font-size: 14px;">🚑 Stay Safe, Stay Healthy! 🚑</p>
    `;
  } else if (status === "Canceled") {
    subject = "❌ Your Ambulance Booking has been Canceled";
    message = `
      <h2 style="color: #007bff; text-align: center;">🚑 Emergency Ambulance Service</h2>
      <hr style="border-top: 1px solid #ddd;">
      <p>Dear <strong>${name}</strong>,</p>
      <p>We regret to inform you that your ambulance booking has been <strong style="color: red;">canceled</strong>.</p>
      <p>If this was an error or you need a new booking, please contact us immediately.</p>

      <h3 style="color: #007bff;">📌 Canceled Booking Details:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Pickup Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.pickupLocation}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Drop Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.dropLocation}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Status:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd; color: red;"><strong>Canceled</strong></td></tr>
      </table>

      <p>For any concerns or to rebook, please contact our support team.</p>
      <p>We apologize for any inconvenience caused.</p>
      <p style="text-align: center; color: #777; font-size: 14px;">🚑 Stay Safe, Stay Healthy! 🚑</p>
    `;
  }

  const mailOptions = {
    from: "arunpatwa2605@gmail.com",
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        ${message}
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${subject}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

// Update Booking (Assign Ambulance & Driver)
// Update Booking (Assign Ambulance & Driver)
exports.updateBooking = async (req, res) => {
  try {
    const { ambulanceId, driverId, status } = req.body;
    const booking = await Booking.findById(req.params.id).populate("userId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { ambulanceId, driverId, status, assignedAt: new Date() },
      { new: true }
    ).populate("userId ambulanceId driverId");

    if (["Confirmed", "Completed", "Canceled"].includes(status) && updatedBooking.userId) {
      await sendBookingEmail(
        updatedBooking.userId.email,
        updatedBooking.userId.name,
        updatedBooking,
        status
      );
    }

    res.status(200).json({ message: "Booking updated", updatedBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, pickupLocation, dropLocation, emergencyType } = req.body;

    if (!userId || !pickupLocation || !emergencyType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = new Booking({
      userId,
      pickupLocation,
      dropLocation,
      emergencyType,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", newBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email phoneNo")
      .populate("ambulanceId")
      .populate("driverId");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId", "name email phoneNo")
      .populate("ambulanceId")
      .populate("driverId");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update booking (assign ambulance & driver)


// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.getBookingsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Get userId from route params

    // Find bookings for the given userId
    const bookings = await Booking.find({ userId })
      .populate("userId", "name email phoneNo") // Populate user details
      .populate("ambulanceId") // Populate ambulance details
      .populate("driverId"); // Populate driver details

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    // Send the bookings as a response
    res.status(200).json(bookings);
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get bookings by driverId
exports.getBookingsByDriverId = async (req, res) => {
  try {
    const driverId = req.params.driverId; // Get driverId from route params

    // Find bookings assigned to the given driverId
    const bookings = await Booking.find({ driverId })
      .populate("userId", "name email phoneNo") // Populate user details
      .populate("ambulanceId") // Populate ambulance details
      .populate("driverId"); // Populate driver details

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this driver" });
    }

    // Send the bookings as a response
    res.status(200).json(bookings);
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
