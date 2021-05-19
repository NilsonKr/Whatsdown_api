const db = require('mongoose');

db.Promise = global.Promise;

function connectDb(uri) {
	db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log('[db] Connected!'))
		.catch(err => console.error(err));
}

module.exports = connectDb;
