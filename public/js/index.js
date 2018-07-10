var socket = io(); // This variable create connection between server and client "REAL TIME!!!"

socket.on('connect', function(){
    console.log('Connected to server')
});

socket.on('disconnect', function() {
    console.log('Servers are down')
})

socket.on('newMessage', function(newMessage) {
    console.log(newMessage)
})

socket.on('welcomeMessage', function (message) {
    console.log(message);
})

socket.on('newUser', function(message) {
    console.log(message);
})