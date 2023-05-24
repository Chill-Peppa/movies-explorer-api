const moviesRouter = require('express').Router();

const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');

moviesRouter.post('/', createMovie);
moviesRouter.get('/', getSavedMovies);
moviesRouter.delete('/:_id', deleteMovie);

module.exports = moviesRouter;

// !допилить валидацию joi, celebrate и импорт контроллеров
