const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const signRouter = require('./sign');
const { auth } = require('../middlewares/auth');
const { pageNotFound } = require('../middlewares/pageNotFound');

router.use(signRouter);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use(pageNotFound);

module.exports = router;
