const socket = io.connect('http://localhost:4000/')
const loginWrapper = document.querySelector('#login')
const loginForm = document.querySelector('#login-form')
const username = document.querySelector("input[name='username']")

const wrapper = document.querySelector('.wrapper')
const messageForm = document.querySelector('#messages-form')
const message = document.querySelector("input[name='message']")
const messagesList = document.querySelector('#messages-list')
const empty = document.querySelector('#empty')

const clientsCountContent = document.querySelector('#live-count')

// ---------
// ON SOCKET
// ---------
socket.on('logged', () => {
  loginWrapper.style.display = 'none'
  wrapper.style.display = 'block'
  message.focus()
})

socket.on('newuser', (user, connectedClients) => {
  console.log(connectedClients)
  clientsCountContent.innerHTML = connectedClients.length
  console.log(`New user: ${user.username}`)

})

socket.on('addmessage', (data, clientsCount) => {
  empty.style.display = 'none'
  messagesList.insertAdjacentHTML('beforeend', `<p class="message">${data.message}</p>`)
})

// ---------
// JOINING CHAT
// ---------
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (username.value != '') {
    socket.emit('login', {
      username: username.value
    })
  }

})

// ---------
// SENDING MESSAGES
// ---------
messageForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (message.value != '') {
    socket.emit('newmessage', {
      message: message.value,
    })
    message.value = ''
  }
})
