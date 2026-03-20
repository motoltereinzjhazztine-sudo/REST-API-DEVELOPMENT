const express = require('express');
const router = express.Router();

// Import the Controller
const { protect, authorize } = require('../middleware/authMiddleware');

//Anyone can get rooms
router.get('/', getRooms);

// Only Admins and Managers can create rooms
router.post('/', protect, authorize('admin', 'manager'), createRoom);

const {
    getallRooms,
    createRoom,
    getRoomByID,
    updateRoom,
    deleteRoom,
    getAllRooms,
}   =require('../controllers/roomController');

//Routes
router.get('/rooms', getAllRooms);
router.post('/rooms', createRoom);
router.get('/rooms/:id', getRoomByID);
router.put('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);

module.exports = router;