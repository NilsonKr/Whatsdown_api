const store = require('./store');
const msgStore = require('./../messages/store');
const { ObjectId } = require('mongodb');

async function getChats(query) {
	let filter = {};
	if (query.user) {
		//Filter chats of certain user
		filter.users = { $in: [ObjectId(query.user)] };
	}

	//Return chats with their messages
	try {
		const result = await store.getAll(filter);

		const completeChats = await Promise.all(
			result.map(async item => {
				const messages = await msgStore.getAll({ chat: item._id });

				const wholeChat = JSON.parse(JSON.stringify(item));
				wholeChat.messages = [...messages];

				return wholeChat;
			})
		);

		return completeChats;
	} catch (error) {
		console.error(error);
	}

	return;
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
