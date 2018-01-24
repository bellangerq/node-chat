const express = require('express')
const app = express()
const server = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(server)

const sassMiddleware = require('node-sass-middleware')

app.use(sassMiddleware({
  src: path.join(__dirname, '/sass'),
  dest: path.join(__dirname, '/public'),
  debug: true,
  outputStyle: 'compressed',
  force: true,
  prefix: '/public'
}))

server.listen(process.env.PORT || 4000)

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

let me = false
let connectedClients;

io.on('connection', socket => {

  // Count clients
  io.clients((error, clients) => {
    if (error) throw error
    connectedClients = clients
  });

  // Detect new client
  socket.on('login', user => {
    me = user
    socket.emit('logged')
    io.emit('newuser', me, connectedClients)
  })

  // Send message
  socket.on('newmessage', data => {
    io.emit('addmessage', data)
  })
})
