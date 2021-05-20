const Model = require('./model');

function getAll() {
	return Model.find();
}

function getOne(id) {
	return Model.findOne({ _id: id });
}

module.exports = {
	getAll,
	getOne,
};
