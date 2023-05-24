const moviesRouter = require('express').Router();

const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');

moviesRouter.get('/', getSavedMovies);
moviesRouter.post('/', createMovie);
moviesRouter.delete('/:_id', deleteMovie);

module.exports = moviesRouter;

// !допилить валидацию joi, celebrate и импорт контроллеров
