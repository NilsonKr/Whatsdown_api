const store = require('./store');

function getUsers() {
	return store.getAll();
}

function getOne(id) {
	return store.getOne(id);
}

function createUser(user) {
	const { name, email, password } = user;

	if (!name || !email || !password) {
		throw new Error('User Data Incomplete!');
	}

	const newUser = {
		name,
		email,
		password,
	};

	return store.create(newUser);
}

function updateUser(id, newData) {
	if (!newData) {
		throw new Error('Update Data Required!');
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
