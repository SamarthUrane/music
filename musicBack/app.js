import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import "./src/DB/conn.js"
import User from "./src/Schemas/userLogin.js";
import songModel from "./src/Schemas/songModel.js";
import multer from "multer";

// sarthak
const app = new express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const upload = multer({ dest: 'uploadedSongs/' })


app.get("/", (req, res) => {
    res.send("Register")
})

app.post("/authenticate", async (req, res) => {
    const token = req.body.token;
    try {
        const tokenbody = jwt.verify(token, "secretOrPrivateKey");
        res.status(200).json({ username: tokenbody.username, email: tokenbody.email });
    } catch (err) {
        res.status(401).json({ Message: "Verification failed" });
    }
});


app.post("/register", async (req, res) => {
    var { username, email, password, profile } = req.body;
    try {
        const existsuser = await User.findOne({ username: username });

        if (!existsuser) {
            const salt = await bcrypt.genSalt(10);

            password = await bcrypt.hash(password, salt);

            const newUser = new User({
                username: username,
                email: email,
                password: password,
                profile: profile
            });
            const token = jwt.sign({ username: newUser.username, email: newUser.email }, "secretOrPrivateKey")
            await newUser.save();
            res.status(200).json({ token: token, user: newUser });
        } else {
            res.status(400).json({ message: "User already exists." });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post("/login", async (req, res) => {
    var { email, password } = req.body;

    const user = await User.findOne({ email: email })
    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {

            if (result) {
                const token = jwt.sign({ username: user.username, email: user.email }, "secretOrPrivateKey");
                res.status(200).json({ token: token, user: user });
                return;
            }
            else {
                res.status(400).json({ message: "Wrong Password!!!" })
            }

        });
    }
    else {
        res.status(400).json({ message: "Account doesn't exist!!!" })
    }
})

app.post("/getUserData", async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email })
    res.status(200).json({ user: user })
})

app.post("/resetPassword", async (req, res) => {
    const email = req.body.email;
    var newPass = req.body.newPass;
    const salt = await bcrypt.genSalt(10);
    newPass = await bcrypt.hash(newPass, salt);
    console.log(newPass)
    await User.findOneAndUpdate({ email: email }, { password: newPass })
    res.status(200).json({ message: "Password updated Succesfully" })
})

app.post("/uploadSong", upload.single('file'), async (req, res) => {
    const formData = req.body.formData;
    const uploadedBy = req.body.uploadedBy;
    const filePath = formData.file;

    const newSong = new songModel({
        title: formData.title,
        lyrics: formData.lyrics,
        genre: formData.genre,
        file: filePath,
        thumbnail: formData.thumbnail,
        artist: formData.artist,
        uploadedBy: uploadedBy
    });
    try {
        await newSong.save();
        res.status(200).json({ message: "SUCCESS" })
    }
    catch (err) {
        console.log("not success")
        console.log(err)
        res.status(400).json({ message: "NOT SUCCESS" })
    }
})

app.post("/allSongs", async (req, res) => {
    const songs = await songModel.find();
    res.status(200).json({ songs })
})

app.post("/yourSongs", async (req, res) => {
    const userName = req.body.userName;
    const songs = await songModel.find({ artist: userName });
    res.status(200).json({ songs: songs })
})

app.post("/deleteSong", async (req, res) => {
    const id = req.body.id;
    const song = await songModel.deleteOne({ _id: id });
    res.status(200).json({ message: "DELETED" })
})

app.post("/searchResult", async (req, res) => {
    const search = req.body.search;
    if (search != null && search.trim() != '') {
        const regex = new RegExp("^" + search, 'i')
        const songs = await songModel.find({ $or: [{ 'title': regex }, { 'artist': regex }, { 'genre': regex }] }).sort({ 'title': 1 });
        res.status(200).json({ songs: songs });
    }
    else {
        res.status(200).json({ songs: [] });
    }
})
app.post("/genreSongs", async (req, res) => {
    const genre = req.body.genre;
    const songs = await songModel.find({ genre: genre });
    res.status(200).json({ songs: songs })
})

app.post("/getArtists", async (req, res) => {
    // console.log("HERE")
    const distinctArtists = await songModel.distinct('artist');
    const artistsUsers = await User.find({ username: { $in: distinctArtists } },{username:true,profile:true,_id:false});
   
    // console.log(artistsUsers) 
    res.status(200).json({artistsUsers})
})

app.listen(3000, () => {
    console.log("Server Running at port 3000");
})