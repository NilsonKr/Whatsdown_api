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

//JWT Strategy
require('../../utils/auth/jwtStrategy');

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

				//Build Jwt for authorization and return user info
				const { _id: id, name, email, description, status } = user;

				const payload = {
					sub: id,
					name,
					email,
					token: apiToken,
				};

				const JWToken = jwt.sign(payload, config.jwtSecret, {
					expiresIn: '4m',
				});

				res.status(200).json({
					token: JWToken,
					user: { id, name, email, description, status },
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

router.post(
	'/authorizate',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		const { remember } = req.query;

		if (!req.user) {
			return next(boom.unauthorized());
		}

		const { token, name, email, _id: id } = req.user;

		//Built JWT With authorized scopes
		try {
			const apiKey = await apiKeysModel.findOne({ token });

			if (!apiKey) {
				return next(boom.unauthorized());
			}

			const payload = {
				sub: id,
				name,
				email,
				scopes: apiKey.scopes,
			};

			const time = remember === 'true' ? '30d' : '4h';

			const JWTtoken = jwt.sign(payload, config.jwtSecret, {
				expiresIn: time,
			});

			res.status(200).json({
				token: JWTtoken,
			});
		} catch (error) {
			next(error);
		}
	}
);

router.post('/signprovider', async (req, res, next) => {
	const { apiToken, user } = req.body;

	if (!apiToken) {
		return next(boom.unauthorized());
	}

	try {
		const result = await controller.getOrCreate(user);
		//Parse Moongoose Object
		const newUser = result.toObject();
		delete newUser.password;

		//Signing JWT
		const payload = {
			sub: newUser._id,
			name: newUser.name,
			email: newUser.email,
			token: apiToken,
		};

		const jwtToken = jwt.sign(payload, config.jwtSecret, {
			expiresIn: '4m',
		});

		console.log('Good');

		res.status(200).json({
			data: {
				token: jwtToken,
				user: newUser,
			},
			message: 'Login Succesfull!',
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
