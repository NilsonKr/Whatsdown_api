const passport = require('passport');
const express = require('express');
const controller = require('./controller');

const router = express.Router();

//Basic Strategy
require('../../utils/auth/basicStrategy');

router.post(
	'/sign-in',
	passport.authenticate('basic', { session: false }),
	(req, res, next) => {
		res.status(201).json(req.user);
	}
);

module.exports = router;
