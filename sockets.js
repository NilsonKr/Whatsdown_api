const SocketIO = require('socket.io');

const socket = {};

function connect(server) {
	socket.io = SocketIO(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
		},
	});

	socket.io.on('connection', extSocket => {
		console.log('[SOCKET] New Connection!');
		extSocket.emit('message', 'Welcome!');

		//Join a chat room
		extSocket.on('join chat', chat => {
			extSocket.join(chat);
		});

		//Send a msg through chat room
		extSocket.on('private', msg => {
			extSocket.to(msg.chatId).emit('chatmsg', msg.message);
		});

		//Finish connection
		extSocket.on('close', () => {
			extSocket.end();
			console.log('close');
		});
	});
}

module.exports = {
	socket,
	connect,
};
