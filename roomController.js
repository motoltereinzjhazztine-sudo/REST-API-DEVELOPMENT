const Room = require('../models/roomModel');

// 1. GET ALL: List all rooms
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }   catch (error) {
        res.status(500).json({ message: error.mesaage });
    }
};

// 2. CREATE: Add a new room
const createRoom = async (req, res) => {
    try {
        const newRoom = await Room.create(req.body);
        res.status(201).json(newRoom);
    }   catch (error) {
        res.status(400).json({ message: error.mesaage });
    }
};

// 3. GET ONE: View one room details
const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json(room);
    }   catch (error) {
        res.status(500).json({ message: error.mesaage });
    }
};

// 4. UPDATE: Change price or booking status
const updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json(room);
    }   catch (error) {
        res.status(400).json({ message: error.mesaage });
    }
};

// 5. DELETE: Remove a room
const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json({ message: 'Room deleted successfully' });
    }   catch (error) {
        res.status(500).json({ message: error.mesaage });
    }
};

module.exports = {
    getAllRooms,
    createRoom,
    getRoomById,
    updateRoom,
    deleteRoom,
};