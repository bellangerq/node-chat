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

io.on('connection', socket => {

  socket.on('login', user => {
    me = user
    socket.emit('logged')
    io.emit('newuser', me)
  })

  socket.on('newmessage', data => {
    io.emit('addmessage', data)
  })
})
