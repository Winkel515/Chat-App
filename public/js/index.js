var socket = io(); // This variable create connection between server and client "REAL TIME!!!"
var userName = prompt('Welcome to Winkel\'s Chat App!\nPlease enter your name:');
while(!userName){
    userName = prompt('No name detected. Please enter your name:')
}

var retard = true;

function addMessage (newMessage, textColor){
    if(retard){
        var zebra = 'black';
        var textColor = 'white';
        retard = false;
    } else {
        var zebra = 'white';
        var textColor = 'black';
        retard = true;
    }
    var li = $(`<li style="list-style-type: none; color: ${textColor}; text-align: center; background-color: ${zebra}; color: ${textColor}"></li>`);
    li.text(`${newMessage.from}: ${newMessage.text}`);
    $('#messages').append(li);
}

var generateMessage = function (from, text) {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

socket.on('connect', function(){
    console.log('Connected to server');
    addMessage(generateMessage('Admin', `Welcome ${userName}!`), 'red')
});

socket.on('disconnect', function() {
    console.log('Servers are down')
})

socket.on('newMessage', function(newMessage) {
    console.log(newMessage);
    addMessage(newMessage);
})

socket.on('adminMessage', function(newMessage) {
    console.log(newMessage);
    addMessage(newMessage, 'red');
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