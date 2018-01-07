'use strict';

var socket = io.connect('http://localhost:4000');

var messageForm = document.querySelector('#message-form');
var message = document.querySelector("input[name='message']");
var messagesList = document.querySelector('#messages-list');

socket.on('addmessage', function (data) {
  messagesList.insertAdjacentHTML('beforeend', '<p>' + data.message + '</p>');
});

messageForm.addEventListener('submit', function (e) {
  e.preventDefault();

  socket.emit('newmessage', {
    message: message.value
  });

  message.value = '';
});