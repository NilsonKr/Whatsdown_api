const passport = require('passport');
const validateScopes = require('../../utils/auth/handleScopes');
const express = require('express');
const controller = require('./controller');

//JWT Auth Strategy
require('../../utils/auth/jwtStrategy');

const router = express.Router();

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['message:get']),
	async (req, res, next) => {
		try {
			const data = await controller.getList(req.query.chat);

			res.status(200).send({
				data: data,
				message: 'All messages',
			});
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	'/:msgId',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['message:get']),
	async (req, res, next) => {
		try {
			const data = await controller.getOne(req.params.msgId);

			res.status(200).send({
				data: data,
				message: 'All messages',
			});
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['message:create']),
	async (req, res, next) => {
		const { chat, user, message } = req.body;

		try {
			const result = await controller.createOne(chat, user, message);

			res.status(201).send({
				data: result,
				message: 'Message created',
			});
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/:msgId',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['message:delete']),
	async (req, res, next) => {
		try {
			await controller.removeOne(req.params.msgId);

			res.status(202).send({
				data: `Id ${req.params.msgId} Removed`,
				message: `Message removed`,
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
