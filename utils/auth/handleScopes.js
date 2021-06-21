const boom = require('@hapi/boom');

function validateScopes(allowedScopes) {
	return function (req, res, next) {
		if (!req.user || !req.user.scopes) {
			return next(boom.unauthorized());
		}

		const validScopes = allowedScopes.map(scope => req.user.scopes.includes(scope));

		if (validScopes.includes(false)) {
			return next(boom.unauthorized('Missing Scopes'));
		}

		next();
	};
}

module.exports = validateScopes;
