const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors')
const {Server} = require('socket.io')

const {addUser, removeUser, getUser, getUserInRoom} = require('./users');

const PORT = 5000;

const router = require('./router');
const { callbackify } = require('util');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http:localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log('we have a connection');

    socket.on('join', ({name, room}, callback) => { 
        const {error, user} = addUser({id: socket.id, name, room});
        socket.join(room);
        if (callback) callback();
    });

    socket.on('send-message', (data) => {
        console.log(data)
        socket.to(data.room).emit('received_message', data);
    });

    socket.on('disconnect', () => {
        console.log('user has left');
    });
});

app.use(cors);

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));