const express = require('express');
const BookingModel = require('../models/booking.models');

// Router
const bookingRouter = require("express").Router();

// post method
bookingRouter.post('/', async (req, res) => {
    try {
        const {certified, language, title, theatre, place, date, time, price, screen, seats, isBooked } = req.body;

        const newBooking = new BookingModel({certified, language, title, theatre, place, date, time, price, screen, seats, isBooked});
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

//export
module.exports = bookingRouter;