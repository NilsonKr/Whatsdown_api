const SocketIO = require('socket.io');

const socket = {};

function connect(server) {
	socket.io = SocketIO(server);

	socket.io.on('connection', socketOpen => {
		console.log('[SOCKET] New Connection!');
		socket.io.emit('message', 'Welcome!');
	});
}

module.exports = connect;
