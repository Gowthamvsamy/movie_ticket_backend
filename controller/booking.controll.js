const express = require('express');
const BookingModel = require('../models/booking.models');

// Router
const bookingRouter = require("express").Router();

// post method
bookingRouter.post('/', async (req, res) => {
    try {
        const { user_id, poster, certified, language, title, theatre, place, date, time, price, screen, seats, isBooked } = req.body;

        const newBooking = new BookingModel({ user_id, poster, certified, language, title, theatre, place, date, time, price, screen, seats, isBooked });
        await newBooking.save();

        return res.status(201).json({
            message: 'booked successfully',
            success: true,
            data: newBooking
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error booking',
            error: err.message
        });
    }
});

// get method
bookingRouter.get('/getBooking', async (req, res) => {
    try {
        const booking = await BookingModel.find();
        res.json(booking);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Something went wrong' })
    }
});

// patch method
// patch method to update only "isBooked"
bookingRouter.patch('/updateBooking/:id', async (req, res) => {
    const { id } = req.params;
    const { isBooked, user_id, discountedPrice } = req.body;

    if (typeof isBooked !== 'boolean') {
        return res.status(400).json({
            message: '"isBooked" must be a boolean value'
        });
    }

    try {
        const updatedBooking = await BookingModel.findByIdAndUpdate(
            id,
            { isBooked, user_id, discountedPrice },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            message: 'Booking status updated successfully',
            success: true,
            data: updatedBooking
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error updating booking status',
            error: err.message
        });
    }
});


//export
module.exports = bookingRouter;