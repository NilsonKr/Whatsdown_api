const { socket } = require('../../sockets');
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

async function createOne(chat, user, msg) {
	if (!chat || !user || !msg) {
		throw new Error('Missing Data!');
	}

	const newMsg = {
		chat: chat,
		user: user,
		message: msg,
		date: new Date(),
	};

	try {
		//Save new message and then fetch to get it populated
		const result = await store.create(newMsg);
		const messageRetrieved = await store.getOne(result._id);

		socket.io.emit('message', messageRetrieved);

		return messageRetrieved;
	} catch (error) {
		throw new Error(error.message);
	}
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
