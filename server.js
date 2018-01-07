const express = require('express')
const app = express()
const server = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(server)

server.listen(4000)
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {

  socket.on('newmessage', data => {
    io.emit('addmessage', data)
  })
})
