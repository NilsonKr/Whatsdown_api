const express = require('express');
const message = require('../components/messages/network');
const user = require('../components/users/network');
const chat = require('../components/chats/network');

function routes(app) {
	app.use('/messages', message);
	app.use('/users', user);
	app.use('/chats', chat);
}

module.exports = routes;
