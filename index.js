const config = require('./config/index');
const connectSocket = require('./sockets');
const connectDb = require('./db');

const express = require('express');
const { wrapBoomError, handleError } = require('./utils/middlewares/handleError');

//Server
const app = express();
const server = require('http').Server(app);
const routes = require('./network/routes');

//Connections
connectSocket(server);
connectDb(config.db_uri);
//Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
routes(app);

//Error Middlewares
app.use(wrapBoomError);
app.use(handleError);

//Run server
app.use(express.static('public'));

server.listen(config.port, () => {
	console.log(`Magic Happens at http://localhost:${config.port}`);
});
