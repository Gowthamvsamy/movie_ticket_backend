const express = require('express');
const BookingModel = require('../models/booking.models');

// Router
const bookingRouter = require("express").Router();

// post method
bookingRouter.post('/', async (req, res) => {
    try {
        const { poster, certified, language, title, theatre, place, date, time, price, screen, seats, isBooked } = req.body;

        const newBooking = new BookingModel({ poster, certified, language, title, theatre, place, date, time, price, screen, seats, isBooked });
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

//export
module.exports = bookingRouter;