const path = require('path'); // Built it module. Don't need npm i path
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// console.log(__dirname + '/../public');

app.use(express.static(publicPath));

io.on('connection', function(socket) {
    console.log('New user connected');

    // socket.emit('newEmail', {
    //     from: 'winkel515@hotmail.com',
    //     text: 'You\'re fired!',
    //     createdAt: 123
    // })

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail:',newEmail);
    // })

    socket.on('createMessage', (message) => {
        console.log(message);
    })
    
    socket.emit('newMessage', {
        text: 'BROOO!!!',
        from: 'Buddy', 
        createdAt: new Date()
    });

    socket.on('disconnect', function(){
        console.log('User has disconnected')
    })
});

server.listen(port, () => {
    console.log(`Server up on port ${port}`)
})