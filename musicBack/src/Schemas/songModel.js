import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lyrics: {
        type: String,
        required: true
    }, 
    genre: {
        type: String,
        required: true
    },
    likes:{
        type:Number,
        default:0
    },
    file: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    artist: {
        type:String,
        required: true
    },
    uploadedBy:{
        type:String,
        required:true
    }
});

const songModel = mongoose.model('Song', songSchema);

export default songModel
