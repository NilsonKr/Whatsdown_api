const boom = require('@hapi/boom');

const wrapBoomError = (err, req, res, next) => {
	console.log('Yes');
	if (!err.isBoom) {
		next(boom.badImplementation(err));
	}

	next(err);
};

const handleError = (err, req, res, next) => {
	console.log(err);
	const { statusCode, payload } = err.output;

	res.status(statusCode || 500).send(payload);
};

module.exports = {
	wrapBoomError,
	handleError,
};
