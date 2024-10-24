const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
const userModel = require('./models/userModel');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
    secret: process.env.EXPRESS_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let err = req.flash('error');
    console.log(err);
    res.render('login', { err: err });
    req.flash("error", "");
});


app.post('/login', async (req, res) => { 
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email, password }, process.env.JWT_KEY);
                res.cookie("token", token);
                res.redirect('/home');
            }
            else {
                req.flash("error", "Invalid email or password");
                res.redirect('/');
            }
        });
    }
    else {
        req.flash("error", "Invalid email or password");
        res.redirect('/');
    }
});

app.post('/create', async (req, res) => {
    let { name, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.log(err);
                return;
            }
            let user = await userModel.findOne({ email: email });
            if (!user) {
                await userModel.create({
                    Username: name,
                    email,
                    password: hash
                });
                req.flash("error", "User Created");
                let token = jwt.sign({ email, password }, process.env.JWT_KEY);
                res.cookie('token', token);
                res.redirect('/home');
            }
            else {
                req.flash("error", "Email already exists");
                res.redirect('/');
            }
        });
    });
});

app.get('/home', (req, res) => {
    res.render('index');
});


app.listen(80);