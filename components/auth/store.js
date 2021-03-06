const Model = require('./model');

function getAll(filter, isAuth) {
	if (isAuth) {
		return Model.find(filter);
	}

	return Model.find(filter, ['name', 'email', 'description', 'status']).limit(10);
}

function getOne(id) {
	return Model.findOne(id);
}

async function getOrCreate(user) {
	const exists = await Model.findOne({ email: user.email });

	if (!exists) {
		const newUser = new Model(user);

		return newUser.save();
	}

	return exists;
}

function create(user) {
	const newUser = new Model(user);

	return newUser.save();
}

function update(filter, update) {
	return Model.findOneAndUpdate(filter, update, { new: true });
}

function remove(id) {
	return Model.findByIdAndDelete(id);
}
module.exports = {
	getAll,
	getOne,
	create,
	update,
	remove,
	getOrCreate,
};
