// import mongoose from "mongoose";
// mongoose.connect('mongodb://127.0.0.1:27017/music').then(()=>{
//     console.log("connected");
// }).catch(()=>{
//     console.log("Error");
// })

import mongoose from "mongoose"; 

mongoose.connect("mongodb+srv://samarthurane3201:samarthurane3201@cluster0.w2sqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connection of DB succes    ful")
}).catch((err)=>console.log(err));