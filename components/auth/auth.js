const passport = require('passport');
const express = require('express');
const controller = require('./controller');
const apiKeysModel = require('../keys/model');

const config = require('../../config/index');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const router = express.Router();

//Basic Strategy
require('../../utils/auth/basicStrategy');

router.post('/sign-in', (req, res, next) => {
	const { apiToken } = req.body;

	if (!apiToken) {
		return next(boom.unauthorized());
	}

	passport.authenticate('basic', (err, user) => {
		if (err || !user) {
			return next(err);
		}

		req.login(user, { session: false }, async error => {
			try {
				if (error) {
					return next(error);
				}

				const apiKey = await apiKeysModel.findOne({ token: apiToken });

				if (!apiKey) {
					return next(boom.unauthorized());
				}

				//Build Jwt
				const { _id: id, name, email } = user;

				const payload = {
					sub: id,
					name,
					email,
					scopes: apiKey.scopes,
				};

				const JWToken = jwt.sign(payload, config.jwtSecret, {
					expiresIn: '1h',
				});

				res.status(200).json({
					token: JWToken,
					user: { id, name, email },
				});
			} catch (error) {
				next(error);
			}
		});
	})(req, res, next);
});

router.post('/sign-up', async (req, res, next) => {
	try {
		const newUser = await controller.createUser(req.body.user);

		res.status(201).json({
			data: newUser._id,
			message: 'User Created!',
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
