const SocketIO = require('socket.io');
const crypto = require('crypto');

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

		//Join a User dedicated room
		extSocket.on('user room', userId => {
			extSocket.join(userId);
			// console.log(extSocket.rooms);
		});

		//Create a new Chat room
		extSocket.on('new chat', chatInfo => {
			socket.io.to(chatInfo.toUserId).emit('new chat client', chatInfo.chat);
		});

		//Join a chat room
		extSocket.on('join chat', chat => {
			extSocket.join(chat);
		});

		//Send a msg through chat room
		extSocket.on('private', msg => {
			extSocket
				.to(msg.chat)
				.emit('chatmsg', { ...msg, _id: crypto.randomBytes(16).toString('hex') });
		});

		//Finish connection
		extSocket.on('disconnect', () => {
			console.log('close');
		});
	});
}

module.exports = {
	socket,
	connect,
};
