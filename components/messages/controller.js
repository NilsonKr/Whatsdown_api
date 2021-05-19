const store = require('./store');

async function getList(chat) {
	let filter = {};

	if (chat) {
		filter.chat = chat;
	}

	console.log(filter);

	return new Promise((resolve, reject) => {
		store
			.getAll(filter)
			.then(data => resolve(data))
			.catch(err => reject(err));
	});
}

async function getOne(msgFilter) {
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

module.exports = {
	getList,
	getOne,
};
