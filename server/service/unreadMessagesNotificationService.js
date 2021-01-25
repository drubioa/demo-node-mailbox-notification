const app = require('express')();
const http = require('http').Server(app);

let unreadMessagesMap = new Map();

exports.newMessage = (username) => {

    if (!unreadMessagesMap.get(username)) {
        throw new Error(`Cannot obtains username ${username}`);
    }
    unreadMessagesMap.get(username).pendingToRead = unreadMessagesMap.get(username).pendingToRead + 1;
};

exports.getPendingToReadMessages = (username) => {

    return unreadMessagesMap.get(username);
};

exports.removeMesageNotification = (socket) => {

    const username = socket.request._query['username'];
    if (unreadMessagesMap.delete(username)) {
        console.log(`removes of unreadMessagesMap usename: ${username}`);
    } else {
        console.log(`Cannot remove of unreadMessagesMap usename: ${username}`);
    }

};

exports.addMesageNotification = (socket) => {
    const username = socket.request._query['username'];
    console.log(`Add message notification to username:  ${username}`);

    if (!unreadMessagesMap.get(username)) {
        unreadMessagesMap.set(username, {
            socketId: socket.id,
            pendingToRead: 0
        });
    }
};