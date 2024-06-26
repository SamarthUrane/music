import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profile:{type:String,required:true},
    created_at: { type: Date, default: Date.now }
});
 
const User = mongoose.model("User", userSchema);

export default User;