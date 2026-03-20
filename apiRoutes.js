const express = require('express');
const router = express.Router();
const data = require(' ../models/roomModel');

// Get Routes for /rooms with optional filtering
router.get('/rooms', (req, res) => {
    const { features , price, type, isBooked } = req.query;

    let filteredRooms = data
        .filter(
            (room) =>
                !features || room.features.toLowerCase() === features.toLowerCase(),
        )
        .filter((room) => !price || room.price <= parseFloat(price))
        .filter(
            (room) => !type || room.type.toLowerCase().includes(type.toLocaleLowerCase()),
        )
        .filter(
            (room) => 
                isBooked === undefined ||
            room.icsBooked === (isBooked === 'true'),
        );
    return filteredRooms.length === 0
        ? res.status(404).json({
            status: 404,
            message: 'No rooms found matching the criteria',
          })
        : res.status(200).json({
            status: 200,
            message: 'Retrieved rooms succesfully',
            data: filteredRooms,
        })
        
});

router.post('/rooms', (req, res) => {
    const { features , price, type, isBooked } = req.body || {};
    //Validation: Check if required fields are missing
    if (!features || !price || !type || isBooked) {
        return res.status(400).json({
            status: 400,
            message:
            'Bad Request: Features, Price, Type, IsBooked is required',
        });
    }

    const newItem = { id: data.length + 1, feature, price, type, isBooked };
    data.push(newItem);
    res.status(201).json({
        status: 201,
        message: 'Room created successfully',
        data: newItem,
    });
});

router.put('/rooms/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((d) => d.id === id);
    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: 'Room with ID ${id} not found',
        });
    }

    data[index] = { id, ...req.body };
    req.status(200).json({
        status: 200,
        message: 'Room updated successfully',
        data: data[index],
    });
});

router.delete('rooms/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((d) => d.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: 'Room with ID ${id} not found',
        });
    }

    data.splice(index, 1);
    res.status(203).json({
        status: 203,
        message: 'Room deleted successfully',
    });
});

module.export = router;