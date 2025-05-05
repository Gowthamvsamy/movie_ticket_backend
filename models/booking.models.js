const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({

    poster: { type: String },
    certified: { type: String },
    language: { type: String },
    title: { type: String },
    theatre: { type: String },
    place: { type: String },
    date: { type: String },
    time: { type: String },
    price: { type: String },
    screen: { type: String },
    seats: { type: String },
    isBooked: { type: Boolean, default: true },
    user_id: {type: String},
    discountedPrice: {type: String},

})

module.exports = mongoose.model("Booking", bookingSchema)