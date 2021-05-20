const store = require('./store');

function getUsers() {
	return store.getAll();
}

function getOne(id) {
	return store.getOne(id);
}

module.exports = {
	getUsers,
	getOne,
};
