// models/User.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    title: { type: String, required: true },
    year: { type: String },
    genre: [{ type: String }],
    rating: { type: String },
    director: [
        {
            name: { type: String },
            image: { type: String }
        }
    ],
    actors: [
        {
            name: { type: String },
            image: { type: String }
        }
    ],
    musician: [
        {
            name: { type: String },
            image: { type: String }
        }
    ],
    plot: { type: String },
    poster: { type: String },
    cover_img: { type: String },
    runtime: { type: String },
    awards: { type: String },
    language: [{ type: String }],
    boxoffice: { type: String },
    production: [
        {
            name: { type: String },
            image: { type: String }
        }
    ],
    certified: { type: String },
    type: { type: String }

});

module.exports = mongoose.model('Movie', movieSchema);
