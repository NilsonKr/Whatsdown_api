const store = require('./store');
const bcrypt = require('bcryptjs');

function getUsers(filter) {
	return store.getAll(filter);
}

function getOne(id) {
	return store.getOne({ _id: id });
}

async function getOrCreate({ name, email, password }) {
	if (!name || !email || !password) {
		throw new Error('User Data Incomplete!');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = {
		name,
		email,
		password: hashedPassword,
	};

	return store.getOrCreate(newUser);
}

async function createUser(user) {
	const { name, email, password } = user;

	if (!name || !email || !password) {
		throw new Error('User Data Incomplete!');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = {
		name,
		email,
		password: hashedPassword,
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
	getOrCreate,
};
