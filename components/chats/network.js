const express = require('express');
const controller = require('./controller');

const router = express.Router();

//TO-DO: Populate data in delete and post response

router.get('/', async (req, res, next) => {
	try {
		const result = await controller.getChats();

		res.status(200).send({
			data: result,
			message: 'Chats Listed',
		});
	} catch (error) {
		next(error);
	}
});

router.get('/:chatId', async (req, res, next) => {
	try {
		const result = await controller.getOneChat(req.params.chatId);

		res.status(200).send({
			data: result,
			message: 'Chat Retrieved',
		});
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const result = await controller.createChat(req.body);

		res.status(201).send({
			data: result,
			message: 'Chat Created',
		});
	} catch (error) {
		next(error);
	}
});

router.delete('/:chatId', async (req, res, next) => {
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
});

module.exports = router;
