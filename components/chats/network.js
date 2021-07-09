const passport = require('passport');
const validateScopes = require('../../utils/auth/handleScopes');
const express = require('express');
const controller = require('./controller');

const router = express.Router();

//JWT Auth Strategy

require('../../utils/auth/jwtStrategy');

//TO-DO: Populate data in delete and post response

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['chat:get']),
	async (req, res, next) => {
		try {
			const result = await controller.getChats(req.query);

			res.status(200).send({
				data: result,
				message: 'Chats Listed',
			});
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	'/:chatId',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['chat:get']),
	async (req, res, next) => {
		try {
			const result = await controller.getOneChat(req.params.chatId);

			res.status(200).send({
				data: result,
				message: 'Chat Retrieved',
			});
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['chat:create']),
	async (req, res, next) => {
		try {
			const result = await controller.createChat(req.body);

			res.status(201).send({
				data: result,
				message: 'Chat Created',
			});
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	'/:chatId',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['chat:create']),
	async (req, res, next) => {
		const { chatId } = req.params;

		try {
			const result = await controller.updateChat(chatId, req.body);

			res.status(201).send({
				data: result,
				message: 'Chat Created',
			});
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/:chatId',
	passport.authenticate('jwt', { session: false }),
	validateScopes(['chat:delete']),
	async (req, res, next) => {
		const { chatId } = req.params;

		try {
			const result = await controller.removeChat(chatId);

			res.status(200).send({
				data: result,
				message: 'Chat removed',
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
