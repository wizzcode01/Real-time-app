import ChatModel from "../model/chat.js";
import RoomModel from "../model/rooms.js";

export const getSocket = async (req , res) => {
     try {
        const roomName = req.params.roomName
        const room = await RoomModel.findOne(roomName)
        if(!room) {
            return res.status(404).json({error: 'Room not found'})
        }

        //find chat by room id, sort by newest
        const message  = await ChatModel.find({room : room._id})
        .sort({timestamp: -1})
        res.json(message.reverse())

        }catch(err){
        console.log("error from socker controller", err)
        res.status(500).send('server error')
        }
}