const express = require('express')
const app = express()
const PORT = 4000 || process.env.PORT

const http = require('http').Server(app)
const cors = require('cors')
const Room = require('../src/room')

app.use(cors({origin: '*'}))

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const room = new Room()

io.on('connection', async (socket) => {
  const roomID = await room.joinRoom(socket.id)
  socket.join(roomID)
  socket.data.roomID = roomID
  socket_room = room.roomsState.find((r) => r.id === socket.data.roomID)
  socket.data.player = socket_room.sockets.indexOf(socket.id)
  console.log('Made socket connection', socket.id, socket.data.roomID)
  socket.on('restarted', (e) => {
    socket.to(socket.data.roomID).emit('gameState', {
      turn: 0,
      currNumber: -1
    })
  })
  socket.on('makeMove', (e) => {
    socket.to(socket.data.roomID).emit('gameState', {
      turn: (e.gameState.turn + 1) % 2,
      currNumber: e.gameState.currNumber - e.v
    })
    console.log(room.roomsState)
  })
  socket.on('setN', (n) => {
    socket.to(socket.data.roomID).emit('gameState', {
      turn: 0,
      currNumber: n
    })
    console.log(room.roomsState)
  })
  socket.on('disconnect', () => {
    const leftRoomID = room.leaveRoom(socket.id)
    console.log(`Socket ${socket.id} has disconnected from room ${leftRoomID}`)
  })
})

http.listen(PORT, () => console.log(`Server running on port ${PORT}`))