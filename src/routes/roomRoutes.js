const express = require('express');
const router = express.Router();
// Import Controllers here
const {protect, authorize } = require('../middleware/authMiddleware');

// Anyone can get rooms
router.get('/', getRooms);

// ONLY Admins and Managers can create rooms
router.post('/', protect, authorize('admin', 'manager'), createRoom);

module.exports = router;