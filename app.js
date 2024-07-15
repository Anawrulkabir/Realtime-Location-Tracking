const express = require('express')
const app = express()
const http = require('http')
const path = require('path')

const socketIo = require('socket.io')
const server = http.createServer(app)
const io = socketIo(server)

app.set('view engine', 'ejs')

// Correct way to serve static files
app.use('/public', express.static(path.join(__dirname, 'public')))

io.on('connection', function (socket) {
  // console.log('connected')
  socket.on('send-location', function (data) {
    io.emit('receive-location', { id: socket.id, ...data })
  })
  socket.on('disconnect', function () {
    io.emit('user-disconnected', socket.id)
  })
})

app.get('/', function (req, res) {
  res.render('index')
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
