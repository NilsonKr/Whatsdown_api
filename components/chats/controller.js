const store = require('./store');

function getChats() {
	return store.getAll();
}

function getOneChat(chatId) {
	return store.getOne(chatId);
}

function createChat(users) {
	if (!users || !users.length) {
		return new Error('Users Required!');
	}

	const newChat = {
		users: [...users],
	};

	return store.create(newChat);
}

function removeChat(id) {
	return store.remove(id);
}

module.exports = {
	getChats,
	getOneChat,
	createChat,
	removeChat,
};
