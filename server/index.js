const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {addUser, removeUser, getUser, getUserInRoom} = require('./users');

const PORT = 5000;

const router = require('./router');
const { callbackify } = require('util');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('we have a connection');

    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});

        if (error) return callback(error);

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined!`});

        socket.join(user.room);
    
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});
        callback();
    })

    socket.on('disconnect', () => {
        console.log('user has left');
    })
});

app.use(router);

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));