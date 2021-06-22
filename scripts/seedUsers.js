//DEBUG=app:* node scripts/seedUsers.js
const debug = require('debug')('app:scripts:users');
const bcryptjs = require('bcryptjs');
const chalk = require('chalk');
const config = require('../config/index');

const connectDb = require('../db');
const { createUser } = require('../components/auth/controller');

connectDb(config.db_uri);

const users = [
	{
		name: 'Nilson',
		email: 'nilson@undefined.com',
		password: config.privatePassword,
		// description: 'Fullstack Developer At Seoul :3',
		// status: '🦄',
	},
	{
		name: 'mina',
		email: 'mina@undefined.com',
		password: config.privatePassword,
		// status: '🐧',
		// description: 'Singer and dancer from Twice ',
	},
];

async function newUser(user) {
	const { password } = user;
	try {
		const cryptPassword = await bcryptjs.hash(password, 10);

		const data = await createUser({ ...user, password: cryptPassword });

		debug(chalk.greenBright(`User ${data._id} has been created`));
	} catch (error) {
		throw new Error(error);
	}
}

async function seedUsers(usersList) {
	try {
		const usersPromises = usersList.map(newUser);

		await Promise.all(usersPromises);

		debug(chalk.blueBright(`Users Created`));
		process.exit(1);
	} catch (error) {
		debug(chalk.redBright(`Error : ${error.message}`));
		process.exit(2);
	}
}

seedUsers(users);
