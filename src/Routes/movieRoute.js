const express = require('express');
const Movie = require('../models/Movie');
const Show = require('../models/Show');


const router = express.Router();


// GET /movies
router.get('/', async (req, res) => {
const movies = await Movie.find().lean();
res.json(movies);
});


// GET /movies/:movieId/shows
router.get('/:movieId/shows', async (req, res) => {
const { movieId } = req.params;
const shows = await Show.find({ movieId }).lean();
res.json(shows);
});


module.exports = router;