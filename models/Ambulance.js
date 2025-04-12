const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
    numberPlate: { type: String, required: true, unique: true },
    type: { type: String, enum: ['Basic', 'Advanced', 'ICU'], required: true },
    status: { type: String, enum: ['Available', 'Assigned'], default: 'Available' },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Driver assigned to the ambulance
});

module.exports = mongoose.model('Ambulance', AmbulanceSchema);
