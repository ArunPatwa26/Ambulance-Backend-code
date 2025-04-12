const Ambulance = require("../models/Ambulance");
const User = require("../models/User");

// Create an ambulance and assign a driver at the same time
exports.createAmbulance = async (req, res) => {
    try {
        const { numberPlate, type, driverId } = req.body;

        // Check if the driver exists and has the role "Driver"
        const driver = await User.findById(driverId);
        if (!driver || driver.role !== "Driver") {
            return res.status(400).json({ message: "Invalid driver ID or user is not a driver" });
        }

        // Create ambulance with assigned driver
        const newAmbulance = new Ambulance({
            numberPlate,
            type,
            status:"Available",
            driverId
        });

        await newAmbulance.save();
        res.status(201).json({ message: "Ambulance created and driver assigned successfully", ambulance: newAmbulance });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update ambulance details
exports.updateAmbulance = async (req, res) => {
    try {
        const { ambulanceId } = req.params;
        const { status } = req.body;

        // Ensure status update
        const updatedAmbulance = await Ambulance.findByIdAndUpdate(
            ambulanceId,
            { status }, // Only update status if provided
            { new: true }
        );

        if (!updatedAmbulance) {
            return res.status(404).json({ message: "Ambulance not found" });
        }

        res.status(200).json({ message: "Ambulance updated successfully", ambulance: updatedAmbulance });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Get all ambulances
exports.getAllAmbulances = async (req, res) => {
    try {
        const ambulances = await Ambulance.find().populate("driverId", "name email phoneNo role");

        res.status(200).json({ ambulances });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get ambulance by ID
exports.getAmbulanceById = async (req, res) => {
    try {
        const { ambulanceId } = req.params;

        const ambulance = await Ambulance.findById(ambulanceId).populate("driverId", "name email phoneNo role");

        if (!ambulance) {
            return res.status(404).json({ message: "Ambulance not found" });
        }

        res.status(200).json({ ambulance });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteAmbulance = async (req, res) => {
    try {
        const { ambulanceId } = req.params;

        // Find and delete the ambulance
        const deletedAmbulance = await Ambulance.findByIdAndDelete(ambulanceId);

        if (!deletedAmbulance) {
            return res.status(404).json({ message: "Ambulance not found" });
        }

        res.status(200).json({ message: "Ambulance deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
