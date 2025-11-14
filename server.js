import express from 'express'
import cors from 'cors'
import http, { createServer } from 'http'
import { Socketio } from 'socket.io'

const app = express()
//create http server and pass the app instance to it 
const httpServer = http.createServer(app)

//initialize socket and attach it to http server to enable listening
const io = Socketio(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log('Server is running ')
})




