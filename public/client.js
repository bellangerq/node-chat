'use strict';

var socket = io.connect('http://localhost:4000/');
var loginWrapper = document.querySelector('#wrapper-login');
var loginForm = document.querySelector('#login-form');
var username = document.querySelector("input[name='username']");

var messageWrapper = document.querySelector('#messages');
var messageForm = document.querySelector('#messages-form');
var message = document.querySelector("input[name='message']");
var messagesList = document.querySelector('#messages-list');
var empty = document.querySelector('#empty');

var clientsCountContent = document.querySelector('#live-count');

// ---------
// ON SOCKET
// ---------
// socket.on('logged', () => {
//   loginWrapper.style.display = 'none'
//   messageWrapper.style.display = 'block'
//   message.focus()
// })

socket.on('newuser', function (user, connectedClients) {
  console.log(connectedClients);
  clientsCountContent.innerHTML = connectedClients.length;
  console.log('New user: ' + user.username);
});

socket.on('addmessage', function (data, clientsCount) {
  empty.style.display = 'none';
  messagesList.insertAdjacentHTML('beforeend', '<p class="message">' + data.message + '</p>');
});

// ---------
// JOINING CHAT
// ---------
// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault()
//
//   socket.emit('login', {
//     username: username.value
//   })
//
// })

// ---------
// SENDING MESSAGES
// ---------
messageForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (message.value != '') {
    socket.emit('newmessage', {
      message: message.value
    });

    message.value = '';
  }
});