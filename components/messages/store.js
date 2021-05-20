const mocks = require('../../utils/mocks/messages.json');
const Model = require('./model');

function getAll(filter) {
	//Retrieve Data From the users in the messages listed
	return new Promise((resolve, reject) => {
		Model.find(filter)
			.populate('user')
			.exec((err, res) => {
				if (err) reject(err);

				resolve(res);
			});
	});
}

function getOne(idFilter) {
	//Retrieve Data From the user
	return new Promise((resolve, reject) => {
		Model.findOne(idFilter)
			.populate('user')
			.exec((err, res) => {
				if (err) reject(err);

				resolve(res);
			});
	});
}

function create(newMsg) {
	const msg = new Model(newMsg);

	return msg.save();
}

function removeOne(id) {
	return Model.deleteOne({ _id: id });
}

module.exports = {
	getAll,
	getOne,
	removeOne,
	create,
};
