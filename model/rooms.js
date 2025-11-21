import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
   name: String, 
   users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
},
{timestamps:true}
)

const RoomModel = mongoose.model('RoomModel', RoomSchema)
export default RoomModel