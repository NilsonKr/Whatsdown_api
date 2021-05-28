const store = require('./store');
const msgStore = require('./../messages/store');

function getChats() {
	return store.getAll();
}

async function getOneChat(chatId) {
	try {
		const result = await store.getOne(chatId);
		const messages = await msgStore.getAll({ chat: chatId });

		//Create a new chat with their messages
		const completeChat = JSON.parse(JSON.stringify(result));
		completeChat.messages = [...messages];

		return completeChat;
	} catch (error) {
		console.error(error);
	}

	// return store.getOne(chatId);
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
