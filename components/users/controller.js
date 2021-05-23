const store = require('./store');

function getUsers() {
	return store.getAll();
}

function getOne(id) {
	return store.getOne(id);
}

function createUser(name) {
	if (!name) {
		return new Error('User Name Required!');
	}

	const newUser = {
		name: name,
	};

	return store.create(newUser);
}

function updateUser(id, newData) {
	if (!newData) {
		return new Error('Update Data Required!');
	}

	return store.update({ _id: id }, newData);
}

function deleteUser(id) {
	return store.remove(id);
}

module.exports = {
	getUsers,
	getOne,
	createUser,
	updateUser,
	deleteUser,
};
