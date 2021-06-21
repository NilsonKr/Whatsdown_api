//DEBUG=app:* node scripts/seedApiKeys.js
const debug = require('debug')('app:scripts:users');
const crypto = require('crypto');
const chalk = require('chalk');
const config = require('../config/index');

const connectDb = require('../db');
const ApiKeyModel = require('../components/keys/model');

connectDb(config.db_uri);

const apiKeys = [
	{
		token: genApiToken(),
		scopes: [
			'auth:login',
			'auth:signup',
			'user:get',
			'message:get',
			'message:create',
			'chat:get',
			'chat:create',
		],
	},
	{
		token: genApiToken(),
		scopes: [
			'auth:login',
			'auth:signup',
			'user:get',
			'user:update',
			'user:delete',
			'message:get',
			'message:create',
			'message:delete',
			'message:update',
			'chat:get',
			'chat:create',
			'chat:delete',
			'chat:update',
		],
	},
];

function genApiToken() {
	return crypto.randomBytes(32).toString('hex');
}

async function seedApiKeys(keysList) {
	try {
		const apiKeysPromise = keysList.map(async apiKey => {
			const newKey = new ApiKeyModel(apiKey);

			await newKey.save();
		});

		await Promise.all(apiKeysPromise);

		debug(chalk.green(`Api Keys Created Succesfully`));
		process.exit(2);
	} catch (error) {
		debug(chalk.red(`Error : ${error.message}`));
		process.exit(2);
	}
}

seedApiKeys(apiKeys);
