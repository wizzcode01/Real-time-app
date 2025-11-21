import { getSocket } from "../controller/socketController.js";
import express from 'express'

const router = express.Router() 

router.get('/getMessage/general', getSocket)

export default router