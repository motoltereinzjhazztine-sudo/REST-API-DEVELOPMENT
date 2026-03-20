const mongoose = require('mongoose');

// This is the "Rule Book" for a Room
const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,// Number: 101
        required: true,
        unique: true, // No duplicate room numbersw are allowed
        min:[100, 'Room number must 3 digits'], // Custom error message if room number < 100
    },
    type: {
        type: String, // Text: "Single", "Suite",
        required: true, 
    },
    price: {
        type: Number,
        required: true,
        min:[0, 'Price cannot be negative'], // Custom error message if price < 0
    },
    isBooked: {
        type: Boolean, // True or False
        dafault: false, // Assume room is empty (False) at first
    },
    features: [String], // A list of words: ["Wifi", "TV", "Bath"]
    maintenanceLog: [
        {
            date: { type: Date, default: Date.now },
            issue: String, // e.g., "Broken AC"
            fixed: Boolean
        }
    ]
});

module.exports = mongoose.model('Room', roomSchema);    