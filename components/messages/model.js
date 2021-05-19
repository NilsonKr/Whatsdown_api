const moongose = require('mongoose');
const Schema = moongose.Schema;

const msgSchema = new Schema({
	chat: String,
	user: {
		type: Schema.ObjectId,
		ref: 'users',
	},
	message: String,
	date: Date,
});

const msgModel = moongose.model('messages', msgSchema);

module.exports = msgModel;
