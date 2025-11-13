import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    message: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId , ref: "User", required: true},
    room: {type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true}
},
{timestamps: true}
)

const ChatModel = mongoose.model('chatModel', ChatSchema) 
export default ChatModel