const passport = require('passport');
const express = require('express');
const controller = require('./controller');
const validateScopes = require('../../utils/auth/handleScopes');

//JWT Strategy
require('../../utils/auth/jwtStrategy');

const router = express.Router();

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['user:get']),
	async (req, res, next) => {
		try {
			const result = await controller.getUsers();

			res.status(200).json({
				data: result,
				message: 'Users Retrieved',
			});
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	'/:userId',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['user:get']),
	async (req, res, next) => {
		const { userId } = req.params;

		try {
			const [result] = await controller.getUsers({ _id: userId });

			//Parse mongoose Document
			const response = result.toObject();
			delete response.password;

			res.status(200).send({
				data: response,
				message: 'User retrieved',
			});
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	'/:userId',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['user:update']),
	async (req, res, next) => {
		const { userId } = req.params;

		try {
			const result = await controller.updateUser(userId, req.body);

			res.status(201).send({
				data: result,
				message: 'User Updated',
			});
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/:userId',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['user:delete']),
	async (req, res, next) => {
		const { userId } = req.params;

		try {
			const result = await controller.deleteUser(userId);

			res.status(200).send({
				data: result,
				message: 'User Removed',
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
