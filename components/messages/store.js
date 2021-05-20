const mocks = require('../../utils/mocks/messages.json');
const Model = require('./model');

function getAll(filter) {
	return Model.find(filter);
}

function getOne(idFilter) {
	return Model.find(idFilter);
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
