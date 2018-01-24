'use strict';

var socket = io.connect('https://node-socket-messenger.herokuapp.com/');

var loginWrapper = document.querySelector('#wrapper-login');
var loginForm = document.querySelector('#login-form');
var username = document.querySelector("input[name='username']");

var messageWrapper = document.querySelector('#messages');
var messageForm = document.querySelector('#messages-form');
var message = document.querySelector("input[name='message']");
var messagesList = document.querySelector('#messages-list');
var empty = document.querySelector('#empty');

// socket.on('logged', () => {
//   loginWrapper.style.display = 'none'
//   messageWrapper.style.display = 'block'
//   message.focus()
// })

// socket.on('newuser', user => {
//   console.log(`New user: ${user.username}`)
// })

socket.on('addmessage', function (data) {
  empty.style.display = 'none';
  messagesList.insertAdjacentHTML('beforeend', '<p class="message">' + data.message + '</p>');
});

// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault()
//
//   socket.emit('login', {
//     username: username.value
//   })
//
// })

messageForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (message.value != '') {
    socket.emit('newmessage', {
      message: message.value
    });

    message.value = '';
  }
});