const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
	users: [
		{
			notSeen: Number,
			user: { type: Schema.Types.ObjectId, ref: 'users' },
		},
	],
});

const chatModel = mongoose.model('chats', chatSchema);

module.exports = chatModel;
