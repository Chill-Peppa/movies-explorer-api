const Movie = require('../models/movie');

const BadRequestError = require('../errors/badrequest-err');
const NotFoundError = require('../errors/notfound-err');
const ForbiddenError = require('../errors/forbidden-err');

const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;

  const { country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId } = req.body;

  Movie.create({ country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id })
    .then((newMovie) => res.status(201).send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании фильма.',
          ),
        );
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById({ _id: req.params._id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка с указанным id не найдена.');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Запрещено удалять чужие карточки.');
      } else {
        return Movie.deleteOne({ _id: req.params._id }).then(() => res.send(movie));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введен некорректный id.'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
