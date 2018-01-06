const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
server.listen(4000)

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', socket => {

  socket.on('newmessage', data => {
    io.emit('addmessage', data)
  })
})
