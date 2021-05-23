const Model = require('./model');

function getAll() {
	return Model.find();
}

function getOne(id) {
	return Model.findOne({ _id: id });
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
