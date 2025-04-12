const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();
const app = express();
connectDB(); // Connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api", require('./routes/bookingRoutes'));
app.use("/api/bookings", bookingRoutes);
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/ambulance', require('./routes/ambulanceRoutes'));
// const testEmailRoute = require("./controllers/bookingController");


// MongoDB Connection

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
    res.send("Ambulance Booking API is Running 🚑");
  });