const { v4: uuidv4 } = require("uuid");

const ROOM_MAX_CAPACITY = 2;

class Room {
  constructor() {
    this.roomsState = [];
  }

  async joinRoom(socketId) {
    for (let room of this.roomsState) {
      if (room.users < ROOM_MAX_CAPACITY) {
        room.users++
        room.sockets.push(socketId)
        return room.id
      }
    }

    const newID = uuidv4()
    this.roomsState.push({
      id: newID,
      users: 1,
      sockets: [socketId]
    })
    return newID
  }

  leaveRoom(socketId) {
    for (let i = 0; i < this.roomsState.length; i++) {
      const room = this.roomsState[i]
      const index = room.sockets.indexOf(socketId)
      if (index !== -1) {
        room.sockets.splice(index, 1)
        room.users--

        // Clean up empty room
        if (room.users === 0) {
          this.roomsState.splice(i, 1)
        }

        return room.id
      }
    }
    return null
  }

  getRoomBySocket(socketId) {
    return this.roomsState.find(room => room.sockets.includes(socketId))
  }

  getRoomState() {
    return this.roomsState
  }
}

module.exports = Room;