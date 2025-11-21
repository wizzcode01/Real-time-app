import express from 'express'
import cors from 'cors'
import connectDb from './config/db'
import http, { createServer } from 'http'
import { Server } from 'socket.io'
import socketRoute from '/routes/socketRoute.js'
import setupSocket from './utils/socket'

const app = express()
app.use(cors())
app.use(express.json())

connectDb()
//create http server and pass the app instance to it 
const httpServer = http.createServer(app)

//initialize socket and attach it to http server to enable listening
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

setupSocket(io)

app.use('/api/get', socketRoute)

const PORT = process.env.PORT
httpServer.listen(PORT, () => {
    console.log('Server is running ')
})




