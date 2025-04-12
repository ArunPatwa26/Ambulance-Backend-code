const express = require("express");
const router = express.Router();
const ambulanceController = require("../controllers/AmbulaceController");

// Create an ambulance and assign a driver
router.post("/", ambulanceController.createAmbulance);

// Update ambulance details
router.put("/:ambulanceId", ambulanceController.updateAmbulance);

// Get all ambulances
router.get("/", ambulanceController.getAllAmbulances);

// Get ambulance by ID
router.get("/:ambulanceId", ambulanceController.getAmbulanceById);

router.delete("/:ambulanceId", ambulanceController.deleteAmbulance);

module.exports = router;
