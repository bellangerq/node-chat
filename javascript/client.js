const socket = io.connect('http://localhost:4000')

const messageForm = document.querySelector('#message-form')
const message = document.querySelector("input[name='message']")
const messagesList = document.querySelector('#messages-list')

socket.on('addmessage', data => {
  messagesList.insertAdjacentHTML('beforeend', `<p>${data.message}</p>`)
})

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()

  socket.emit('newmessage', {
    message: message.value,
  })

  message.value = ''
})