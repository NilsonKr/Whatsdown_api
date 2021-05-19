const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const data = await controller.getList(req.query.chat);

		res.status(200).send({
			data: data,
			message: 'All messages',
		});
	} catch (error) {
		next(error);
	}
});

router.get('/:msgId', async (req, res, next) => {
	try {
		const data = await controller.getOne(req.params.msgId);

		res.status(200).send({
			data: data,
			message: 'All messages',
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
