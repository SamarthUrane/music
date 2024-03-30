// import mongoose from "mongoose";
// mongoose.connect('mongodb://127.0.0.1:27017/music').then(()=>{
//     console.log("connected");
// }).catch(()=>{
//     console.log("Error");
// })

import mongoose from "mongoose"; 

mongoose.connect("mongodb+srv://samarthurane:Samarth3201@cluster0.otofk1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connection of DB succesful")
}).catch((err)=>console.log(err));