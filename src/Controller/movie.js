const Movie = require('../Model/movieModel');
const Show = require('../Model/showModel');

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().lean();

    if (!movies || movies.length === 0)
      return res.status(404).send({ status: false, msg: 'No movies found' });

    return res.status(200).send({status: true,msg: 'Movies fetched successfully',movies});

  } catch (error) {
    console.error(error.message);
    return res.status(500).send({status: false,msg: 'Internal Server Error'});
  }
};

exports.getShowsByMovieId = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!movieId)
      return res.status(400).send({ status: false, msg: 'movieId is required' });

    const shows = await Show.find({ movieId }).lean();

    if (!shows || shows.length === 0)
      return res.status(404).send({ status: false, msg: 'No shows found for this movie' });

    return res.status(200).send({status: true,msg: 'Shows fetched successfully',shows});

  } catch (error) {
    console.error(error.message);
    return res.status(500).send({status: false,msg: 'Internal Server Error'});  
  }
};

exports.getShowDetails = async (req, res) => {
  try {
    const { showId } = req.params;

    if (!showId)
      return res.status(400).send({ status: false, msg: 'showId is required' });

    const show = await Show.findById(showId).lean();
    if (!show)
      return res.status(404).send({ status: false, msg: 'Show not found' });

    return res.status(200).send({status: true,msg: 'Show details fetched successfully',show});

  } catch (error) {
    console.error(error.message);
    return res.status(500).send({status: false,msg: 'Internal Server Error'});  
  }
};
