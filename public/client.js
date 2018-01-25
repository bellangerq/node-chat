'use strict';

var socket = io.connect('https://node-socket-messenger.herokuapp.com/');
var loginWrapper = document.querySelector('#login');
var loginForm = document.querySelector('#login-form');
var username = document.querySelector("input[name='username']");

var wrapper = document.querySelector('.wrapper');
var messageForm = document.querySelector('#messages-form');
var message = document.querySelector("input[name='message']");
var messagesList = document.querySelector('#messages-list');
var empty = document.querySelector('#empty');

var clientsCountContent = document.querySelector('#live-count');

// Hide login - Show chat
socket.on('logged', function () {
  loginWrapper.style.display = 'none';
  wrapper.style.display = 'block';
  message.focus();
});

// Update clients count when user login
socket.on('newuser', function (user, connectedClients) {
  clientsCountContent.innerHTML = connectedClients;
});

// Display new message
socket.on('addmessage', function (data) {
  empty.style.display = 'none';
  messagesList.insertAdjacentHTML('beforeend', '<p class="message">' + data.message + '</p>');
  messagesList.scrollTop = messagesList.offsetHeight;
});

// Update clients count when user leave
socket.on('userleft', function (connectedClients) {
  clientsCountContent.innerHTML = connectedClients;
});

// Join chat
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (username.value != '') {
    socket.emit('login', {
      username: username.value
    });
  }
});

// Send new message
messageForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (message.value != '') {
    socket.emit('newmessage', {
      message: message.value
    });
    message.value = '';
  }
});