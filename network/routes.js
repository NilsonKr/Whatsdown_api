const express = require('express');
const message = require('../components/messages/network');

function routes(app) {
	app.use('/messages', message);
}

module.exports = routes;
