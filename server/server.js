const path = require('path'); // Built it module. Don't need npm i path
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
    console.log('New user connected');
    
    socket.emit('welcomeMessage', {
        text: 'Whale cum!',
        from: 'Admin'
    })

    socket.broadcast.emit('newUser', {
        text: 'New User has joined the chat room',
        from: 'Admin'
    })

    socket.on('createMessage', (message) => {
        io.emit('newMessage', { // io send to everyone while socket sends to a single person
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('disconnect', function(){
        console.log('User has disconnected')
    })
});

server.listen(port, () => {
    console.log(`Server up on port ${port}`)
})