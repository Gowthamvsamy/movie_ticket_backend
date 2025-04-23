const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({

    certified: { type: String },
    language: { type: String },
    title: { type: String },
    theatre: { type: String },
    place: { type: String },
    date: { type: String },
    time: { type: String },
    price: { type: Number },
    screen: { type: String },
    seats: [{ type: String }],
    isBooked: {type: Boolean, default: true},

})

module.exports = mongoose.model("Booking", bookingSchema)