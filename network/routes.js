const express = require('express');
const message = require('../components/messages/network');
const user = require('../components/users/network');

function routes(app) {
	app.use('/messages', message);
	app.use('/users', user);
}

module.exports = routes;
