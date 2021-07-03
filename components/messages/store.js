const Model = require('./model');

function getAll(filter) {
	//Retrieve Data From the users in the messages listed
	return Model.find(filter);
}

function getOne(idFilter) {
	//Retrieve Data From the user
	return Model.findOne(idFilter);
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
