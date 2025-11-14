import express from 'express'
import cors from 'cors'
import http, { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
//create http server and pass the app instance to it 
const httpServer = http.createServer(app)

//initialize socket and attach it to http server to enable listening
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const PORT = process.env.PORT
httpServer.listen(PORT, () => {
    console.log('Server is running ')
})




