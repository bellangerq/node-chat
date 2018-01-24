'use strict';

var socket = io.connect('http://localhost:4000/');
var loginWrapper = document.querySelector('#login');
var loginForm = document.querySelector('#login-form');
var username = document.querySelector("input[name='username']");

var wrapper = document.querySelector('.wrapper');
var messageForm = document.querySelector('#messages-form');
var message = document.querySelector("input[name='message']");
var messagesList = document.querySelector('#messages-list');
var empty = document.querySelector('#empty');

var clientsCountContent = document.querySelector('#live-count');

// ---------
// ON SOCKET
// ---------
socket.on('logged', function () {
  loginWrapper.style.display = 'none';
  wrapper.style.display = 'block';
  message.focus();
});

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
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (username.value != '') {
    socket.emit('login', {
      username: username.value
    });
  }
});

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