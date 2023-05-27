const moviesRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');

const { createMovieValidation, deleteMovieValidation } = require('../utils/validation');

moviesRouter.post('/', celebrate(createMovieValidation), createMovie);
moviesRouter.get('/', getSavedMovies);
moviesRouter.delete('/:_id', celebrate(deleteMovieValidation), deleteMovie);

module.exports = moviesRouter;
