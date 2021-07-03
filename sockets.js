const SocketIO = require('socket.io');

const socket = {};

function connect(server) {
	socket.io = SocketIO(server, {
		cors: {
			origin: 'http://localhost:8000',
			methods: ['GET', 'POST'],
		},
	});

	socket.io.on('connection', socket => {
		console.log('[SOCKET] New Connection!');
		socket.emit('message', 'Welcome!');
	});
}

module.exports = {
	socket,
	connect,
};
