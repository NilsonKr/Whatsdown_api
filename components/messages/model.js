const moongose = require('mongoose');
const Schema = moongose.Schema;

const msgSchema = new Schema({
	chat: String,
	user: String,
	message: String,
	date: Date,
});

const msgModel = moongose.model('messages', msgSchema);

module.exports = msgModel;
