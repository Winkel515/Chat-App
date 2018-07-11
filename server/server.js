const path = require('path'); // Built it module. Don't need npm i path
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
    console.log('New user connected');

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', { // io send to everyone while socket sends to a single person
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
        callback('This is from the server');
    })

    socket.on('disconnect', function(){
        console.log('User has disconnected')
        socket.broadcast.emit('newMessage', generateMessage('Admin', `${socket['userName']} has disconnected. Nobody liked him/her (woah this chat app is polically correct!?)`));
    })

    socket.on('saveUserName', (userName) => {
        socket.broadcast.emit('adminMessage', generateMessage('Admin', `${userName} has joined the chat room.`));
        socket['userName'] = userName;
    })
});

server.listen(port, () => {
    console.log(`Server up on port ${port}`)
})