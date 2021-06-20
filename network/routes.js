const message = require('../components/messages/network');
const user = require('../components/auth/network');
const chat = require('../components/chats/network');
const auth = require('../components/auth/auth');

function routes(app) {
	app.use('/auth', auth);
	app.use('/messages', message);
	app.use('/users', user);
	app.use('/chats', chat);
}

module.exports = routes;
