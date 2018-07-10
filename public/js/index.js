var socket = io(); // This variable create connection between server and client "REAL TIME!!!"
var userName = prompt('Welcome to Winkel\'s Chat App!\nPlease enter your name:');
while(!userName){
    userName = prompt('No name detected. Please enter your name:')
}

function addMessage (newMessage){
    var li = $('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);
    $('#messages').append(li);
}

socket.on('connect', function(){
    console.log('Connected to server')
});

socket.on('disconnect', function() {
    console.log('Servers are down')
})

socket.on('newMessage', function(newMessage) {
    console.log(newMessage);
    addMessage(newMessage);
})

socket.on('welcomeUser', function() {
    addMessage({
        from: 'Admin',
        text: `Welcome ${userName}!`
    })
})

socket.emit('newUserName', userName);

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: userName,
        text: $('[name=message]').val()
    }, function(serverMessage) {
        console.log('Got it!');
        console.log('Server Message');
    })

    $('[name=message]').val('');
})