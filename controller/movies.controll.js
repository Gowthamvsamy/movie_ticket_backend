// controller/movies.controll.js
const express = require('express');
const Movies = require('../models/movies.models');

const movieRouter = express.Router();

movieRouter.get('/', async (req, res) => {
  try {
    const movieList = await Movies.find();
    res.json(movieList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = movieRouter;
