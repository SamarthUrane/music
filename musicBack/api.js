import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import "./src/DB/conn.js"
import passport from "passport";
import localStrategy from "passport-local";
import session from "express-session";
import User from "./src/Schemas/userLogin.js"
import bodyParser from "body-parser"
import passportLocalMongoose from "passport-local-mongoose";
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Replace with the actual origin of your frontend
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));  // Use body-parser middleware

app.set("view engine", "ejs"); // Set the view engine



app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "samarthsamarthsamarth"
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/home", (req, res) => {
    res.send("home")

});

app.post("/home", (req, res) => { 

    if (req.isAuthenticated()) {
        // Send user information in the response 
        res.status(200).json({ user: req.session.username });
    } else {  
        res.status(401).json({ error: "User is not authenticated" });
    }
});




app.get("/register", (req, res) => {
    res.render("register");
});


app.post("/register", (req, res) => {
    var userData = new User({
        username: req.body.username,
        email: req.body.email,
        password:req.body.password
    });
    User.register(userData, req.body.password, (err, registeredUser) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        passport.authenticate("local")(req, res, () => {
            res.status(200).json({ redirect: "/home"});
        });
    });
});




app.get("/login", (req, res) => {
    res.render("login");
});



app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // Authentication failed 
            return res.json({ redirect: "/" });
        }
        // Authentication successful
        return res.status(200).json({ redirect: "/home" });
    })(req, res, next);
});


app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/")
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { 
        return next();
    }
    res.redirect("/");
}

app.get("/profile", isLoggedIn, (req, res) => {
    res.send("profile");
});

app.listen(3000, () => {
    console.log("Server Running");
});