const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const result = await controller.getUsers();

		res.status(200).send({
			data: result,
			message: 'List of Users',
		});
	} catch (error) {
		next(error);
	}
});

router.get('/:userId', async (req, res, next) => {
	try {
		const result = await controller.getOne(req.params.userId);

		res.status(200).send({
			data: result,
			message: 'User retrieved',
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
