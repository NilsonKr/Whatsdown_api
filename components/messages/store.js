const mocks = require('../../utils/mocks/messages.json');
const Model = require('./model');

function getAll(filter) {
	return new Promise((resolve, reject) => {
		Model.find(filter)
			.populate('user')
			.exec((err, res) => {
				if (err) {
					reject(err);
				}

				resolve(res);
			});
	});
}

function getOne(idFilter) {
	return Model.find(idFilter);
}

module.exports = {
	getAll,
	getOne,
};
