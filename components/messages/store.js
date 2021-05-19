const mocks = require('../../utils/mocks/messages.json');

function getAll() {
	return Promise.resolve(mocks);
}

function get(idFilter) {
	const filtered = mocks.filter(message => message.user === idFilter);

	return Promise.resolve(filtered);
}

module.exports = {
	getAll,
	get,
};
