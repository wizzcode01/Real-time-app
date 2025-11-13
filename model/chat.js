import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    message: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId , ref: "User"},
    room: {type: mongoose.Schema.Types.ObjectId, ref: "room"}
},
{timestamps: true}
)

const ChatModel = mongoose.model('chatModel', ChatSchema) 
export default ChatModel