import { getSocket } from "../controller/socketController.js";
import express from 'express'

const router = express.Router() 

router.get('/getMessage', getSocket)

export default router