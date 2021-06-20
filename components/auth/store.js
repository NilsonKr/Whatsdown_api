const Model = require('./model');

function getAll(filter) {
	return Model.find(filter);
}

function getOne(id) {
	return Model.findOne(id);
}

function create(user) {
	const newUser = new Model(user);

	return newUser.save();
}

function update(filter, update) {
	return Model.findOneAndUpdate(filter, update);
}

function remove(id) {
	return Model.findByIdAndDelete(id);
}
module.exports = {
	getAll,
	getOne,
	create,
	update,
	remove,
};
