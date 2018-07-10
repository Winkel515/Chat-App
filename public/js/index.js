var socket = io(); // This variable create connection between server and client "REAL TIME!!!"

socket.on('connect', function(){
    console.log('Connected to server')

    socket.emit('createMessage', {
        from: 'Winkel',
        text: 'Yo'
    })
});

socket.on('disconnect', function() {
    console.log('Servers are down')
})

socket.on('newMessage', function(newMessage) {
    console.log(newMessage)
})