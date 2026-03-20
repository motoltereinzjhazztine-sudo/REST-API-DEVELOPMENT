const express = require('express');
const router = express.Router();

const Guest = require('../models/guestModel');

// 1. POST - Create a Guest
router.post('/guests', async (req, res) => {
    try {
        const newGuest = await Guest.create(req.body);
        res.status(201).json(newGuest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. GET - Get All Guests
router.get('/guests', async (req, res) => {
    try {
        const guests = await Guest.find();
        res.status(200).json(guests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. GET - Get Single Guest by ID
router.get('/guests/:id', async (req, res) => {
    try {
        const guest = await Guest.findById(req.params.id);
        if (!guest) return res.status(404).json({ message: "Guest not found" });
        res.status(200).json(guest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. PUT - Update/Replace Guest
router.put('/guests/:id', async (req, res) => {
    try {
        const updatedGuest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updatedGuest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. PATCH - Update Email Only (or Name)
router.patch('/guests/:id', async (req, res) => {
    try {
        const patchedGuest = await Guest.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(patchedGuest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 6. DELETE - Remove Guest
router.delete('/guests/:id', async (req, res) => {
    try {
        await Guest.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Guest deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const Booking = require('../models/bookingModel');

// 1. POST - Create a Booking
router.post('/bookings', async (req, res) => {
    try {
        const newBooking = await Booking.create(req.body);
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. GET - Get All Bookings (with Guest details)
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('guest');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. PUT - Update Entire Booking (Replace)
router.put('/bookings/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // returns the updated doc instead of the old one
            runValidators: true // ensures the new data follows the schema
        });
        res.status(200).json(updatedBooking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. PATCH - Update Specific Field (e.g., just change roomNumber)
router.patch('/bookings/:id', async (req, res) => {
    try {
        const patchedBooking = await Booking.findByIdAndUpdate(req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(patchedBooking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. DELETE - Remove a Booking
router.delete('/bookings/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const Room = require('../models/roomModel');

// PUT: Update a specific maintenance log entry
router.put('/rooms/:roomId/maintenance/:logId', async (req, res) => {
    try {
        const { roomId, logId } = req.params;

        const updatedRoom = await Room.findOneAndUpdate(
            { "_id": roomId, "maintenanceLog._id": logId },
            { 
                "$set": { 
                    "maintenanceLog.$.issue": req.body.issue,
                    "maintenanceLog.$.fixed": req.body.fixed 
                } 
            },
            { new: true, runValidators: true }
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: "Room or Log entry not found" });
        }

        res.status(200).json(updatedRoom);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Import other route files
const apiRoutes = require('./apiRoutes');
const authRoutes = require('./authRoutes');

// Mount routes
router.use('/auth', authRoutes);

// Imporrt the Controller
const {
    getAllRooms,
    createRoom,
    getRoomById,
    updateRoom,
    deleteRoom,
} = require('../controllers/roomController');   

// Routes
router.get('/rooms', getAllRooms); // GET all rooms
router.post('/rooms', createRoom); // CREATE a new room
router.get('/rooms/:id', getRoomById); // GET one room by ID
router.put('/rooms/:id', updateRoom); // UPDATE a room by ID
router.delete('/rooms/:id', deleteRoom); // DELETE a room by ID

module.exports = router;