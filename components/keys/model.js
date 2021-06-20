const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apiKeySchema = new Schema({
	token: String,
	scopes: Array,
});

const apiKeysModel = mongoose.model('apiKeys', apiKeySchema);

module.exports = apiKeysModel;
