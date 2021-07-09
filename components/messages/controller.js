const store = require('./store');

function getList(chat) {
	let filter = {};

	if (chat) {
		filter.chat = chat;
	}

	return new Promise((resolve, reject) => {
		store
			.getAll(filter)
			.then(data => resolve(data))
			.catch(err => reject(err));
	});
}

function getOne(msgFilter) {
	let filter = {};
	if (msgFilter) {
		filter._id = msgFilter;
	}

	return new Promise((resolve, reject) => {
		store
			.getOne(filter)
			.then(data => resolve(data))
			.catch(err => reject(err));
	});
}

function createOne(chat, user, msg) {
	if (!chat || !user || !msg) {
		throw new Error('Missing Data!');
	}

	const newMsg = {
		chat: chat,
		user: user,
		message: msg,
		date: new Date(),
	};

	return store.create(newMsg);
}

function removeOne(id) {
	if (!id) {
		throw new Error("There's no Id");
	}

	return new Promise((resolve, reject) => {
		store
			.removeOne(id)
			.then(data => resolve(data))
			.catch(err => reject(err));
	});
}

module.exports = {
	getList,
	getOne,
	createOne,
	removeOne,
};
