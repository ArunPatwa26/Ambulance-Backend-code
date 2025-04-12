const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      index: true // Indexing for faster queries
    }, 
    ambulanceId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Ambulance',
      default:null // Ensures an ambulance is assigned
    }, 
    driverId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Driver reference
      default: null
    }, 
    status: { 
      type: String, 
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], 
      default: 'Pending',
      index: true // Indexing for filtering bookings by status
    }, 
    pickupLocation: { 
      type: String, 
      required: true,
      trim: true // Removes unnecessary spaces
    }, 
    dropLocation: { 
      type: String, 
      trim: true // Optional, so no 'required' key
    }, 
    emergencyType: { 
      type: String, 
      enum: ['Accident', 'Heart Attack', 'Pregnancy', 'Other'], 
      required: true
    }, 
    assignedAt: { 
      type: Date, 
      default: null // Helps in checking if assigned or not
    }, 
    completedAt: { 
      type: Date, 
      default: null 
    } 
  }, 
  { 
    timestamps: true // Automatically adds createdAt & updatedAt
  }
);

module.exports = mongoose.model('Booking', BookingSchema);
