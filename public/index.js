let socket = io({
    auth: {
        token: "P@sword"
    },
    query: {
        username: 'anonymous'
    }
});
let unreadMessages;

socket.on('connect', () => {
    console.log('Connected to server with id: ' + socket.id);
    document.getElementById("unreadMessages").innerHTML = unreadMessages ? unreadMessages : 0;
});

socket.on('unreadMessage', (unreadMessages) => {
    console.log('unread mesages: ' + unreadMessages);
    document.getElementById("unreadMessages").innerHTML = unreadMessages ? unreadMessages : 0;
});