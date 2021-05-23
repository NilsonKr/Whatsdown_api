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

router.post('/', async (req, res, next) => {
	try {
		const result = await controller.createUser(req.body.name);

		res.status(201).send({
			data: result,
			message: 'User Created',
		});
	} catch (error) {
		next(error);
	}
});

router.put('/:userId', async (req, res, next) => {
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
});

router.delete('/:userId', async (req, res, next) => {
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
});

module.exports = router;
