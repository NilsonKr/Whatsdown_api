const store = require('./store');

async function getList() {
	return new Promise((resolve, reject) => {
		store
			.getAll()
			.then(data => resolve(data))
			.catch(err => reject(err));
	});
}

async function getFilter(idfilter) {
	return new Promise((resolve, reject) => {
		store
			.get(idfilter)
			.then(data => resolve(data))
			.catch(err => reject(err));
	});
}

module.exports = {
	getList,
	getFilter,
};
