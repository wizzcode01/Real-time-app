import express from 'express'
import cors from 'cors'
import http, { createServer } from 'http'
import { Socket } from 'socket.io'

const app = express()
//create http server and pass the app instance to it 
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log('Server is running ')
})