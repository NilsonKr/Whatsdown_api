const Model = require('./model');

function getAll(query) {
	return new Promise((resolve, reject) => {
		Model.find(query)
			.populate('users')
			.exec((err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
	});
}

function getOne(id) {
	return new Promise((resolve, reject) => {
		Model.findById(id)
			.populate('users')
			.exec((err, res) => {
				if (err) {
					reject(err);
				}

				resolve(res);
			});
	});
}

function create(chat) {
	const newChat = new Model(chat);

	return newChat.save();
}

function remove(id) {
	return Model.findOneAndDelete({ _id: id });
}

module.exports = {
	getAll,
	getOne,
	create,
	remove,
};
