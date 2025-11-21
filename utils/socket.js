import { Socket, Socketio } from "socket.io";
import RoomModel from "../model/rooms.js";
import ChatModel from "../model/chat.js";
import { use } from "react";

//listens for a new client websocket connection
export default function setupSocket(io){
    io.on('connection', (socket) => {
        console.log(`User connected ${socket.id}`)

        let userRoomId = null
        //logic to join a room
        socket.on('joinRoom', async (roomName) => {
            if(userRoomId){ //if the user is already in the room
                socket.leave(userRoomId)
            }
            try {
                const room = await RoomModel.findOne({name: roomName})
                if(!room){
                    console.log(`Room ${roomName} not found`)
                    return 
                }
                userRoomId = room._id.toString()
                socket.join(userRoomId) // register a socket to a room
                console.log(`User ${socket.id} has joined: ${roomName}!`)
                socket.emit('status', `Welcome to ${roomName}`)
            }catch(error){
                console.log('Error while joining room', error)
            }
        })

        //send message to a room logic
        socket.on('sendMessage', async(msg) => {
            //msg contain user, message, roomName
            //save message to mongo db for persistence
            try {
            const room = await RoomModel.findOne({name: msg.roomName})
            if(!room) return

            const newMessage = new ChatModel ({
                message: msg.message,
                room: room._id,
                user:msg.user
            })
            await newMessage.save()

        //data for client broadcast
        const clientMessage = {
            message: newMessage.message,
            user:newMessage.user,
            timestamp: newMessage.timestamp,
            room:room.name
        }
        //broadcast the message
        io.to(room._id.toString()).emit('recieveMessage', clientMessage)
        }catch(error){
        console.log('server error occurred trying to emit socket', error)
        }
        })
        socket.on('disconnect', () => {
        console.log(`user disconnected: ${socket.id}`)
        })
    })
}