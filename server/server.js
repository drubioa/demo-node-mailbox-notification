const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;
const unreadMessagesNotificationService = require('./service/unreadMessagesNotificationService');
app.use(express.static('public'));

let registeredSockets = [];

// Endpoint to notify new messages
app.post('/new-message', (req, res) => {
    let username = req.query.username;
    console.log(`username: ${username}`);
    unreadMessagesNotificationService.newMessage(username);
    const data = unreadMessagesNotificationService.getPendingToReadMessages(username);
    registeredSockets[data.socketId].emit('unreadMessage', data.pendingToRead);
    res.status(200);
    res.json({
        unreadMessages: data.pendingToRead
    });
});

io.on('connect', (socket) => {
    console.log('a user connected');
    registeredSockets[socket.id] = socket;

    io.use((socket, next) => {
        unreadMessagesNotificationService.addMesageNotification(socket);
        next();
    });

    // Token validation example
    io.use((socket, next) => _validateToken(socket, next));

    socket.on('disconnect', () => {
        unreadMessagesNotificationService.removeMesageNotification(socket);
        registeredSockets.splice(registeredSockets.indexOf(socket.id), 1);
        console.log('user disconnected');
    });

});

http.listen(port, () => {
    console.log(`listening on: ${port}`);
});

const _validateToken = (socket, next) => {
    const token = socket.handshake.auth.token;
    const username = socket.request._query['username'];
    console.log(username);
    if (token == 'P@sword') {
        console.log('Valid password');
        next();
    } else {
        console.log('Invalid password');
        next(new Error("invalid password"));
    }
};