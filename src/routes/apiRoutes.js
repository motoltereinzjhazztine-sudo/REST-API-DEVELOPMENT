const express = require('express');
const router = express.Router();

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