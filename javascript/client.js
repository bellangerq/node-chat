const socket = io.connect('https://node-socket-messenger.herokuapp.com/')
const loginWrapper = document.querySelector('#login')
const loginForm = document.querySelector('#login-form')
const username = document.querySelector("input[name='username']")

const wrapper = document.querySelector('.wrapper')
const messageForm = document.querySelector('#messages-form')
const message = document.querySelector("input[name='message']")
const messagesList = document.querySelector('#messages-list')
const empty = document.querySelector('#empty')

const clientsCountContent = document.querySelector('#live-count')

// Hide login - Show chat
socket.on('logged', () => {
  loginWrapper.style.display = 'none'
  wrapper.style.display = 'block'
  message.focus()
})

// Update clients count when user login
socket.on('newuser', (user, connectedClients) => {
  clientsCountContent.innerHTML = connectedClients
})

// Display new message
socket.on('addmessage', data => {
  empty.style.display = 'none'
  messagesList.insertAdjacentHTML('beforeend', `<p class="message">${data.message}</p>`)
  messagesList.scrollTop = messagesList.offsetHeight
})

// Update clients count when user leave
socket.on('userleft', connectedClients => {
  clientsCountContent.innerHTML = connectedClients
})

// Join chat
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (username.value != '') {
    socket.emit('login', {
      username: username.value
    })
  }
})

// Send new message
messageForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (message.value != '') {
    socket.emit('newmessage', {
      message: message.value,
    })
    message.value = ''
  }
})
