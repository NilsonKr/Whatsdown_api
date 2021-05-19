const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const data = await controller.getList();

		res.status(200).send({
			data: data,
			message: 'All messages',
		});
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const data = await controller.getFilter(req.params.id);

		res.status(200).send({
			data: data,
			message: 'All messages',
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
