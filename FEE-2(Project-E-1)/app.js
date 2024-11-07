const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const port = process.env.PORT || 3000;
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
    let user; 
    if (req.cookies.token) {
        try {
            user = jwt.verify(req.cookies.token, process.env.JWT_KEY); // Verify the token
        } catch (err) {
            user = { email: "", username: "" };
        }
    } else {
        user = { email: "", username: "" };
    }
    console.log(user);
    res.render('index', { user }); 
    req.flash("error", "");
});


app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email: user.email, username: user.username }, process.env.JWT_KEY);
                res.cookie("token", token, { httpOnly: true }); // Set token as HttpOnly for security
                res.redirect('/');
            } else {
                req.flash("error", "Invalid email or password");
                res.redirect('/login'); 
            }
        });
    } else {
        req.flash("error", "Invalid email or password");
        res.redirect('/login'); 
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
                let newUser = await userModel.create({
                    username: name,
                    email,
                    password: hash
                });
                req.flash("error", "User Created");
                let token = jwt.sign({ email: newUser.email, username: newUser.username }, process.env.JWT_KEY);
                res.cookie('token', token, { httpOnly: true });
                res.redirect('/');
            } else {
                req.flash("error", "Email already exists");
                res.redirect('/');
            }
        });
    });
});

app.get('/login', (req, res) => {
    let user; // Declare user variable
    if (req.cookies.token) {
        try {
            user = jwt.verify(req.cookies.token, process.env.JWT_KEY); 
        } catch (err) {
            user = { email: "", username: "" }; 
        }
    } else {
        user = { email: "", username: "" }; 
    }
    res.render('login', { user, err: '' });
});


app.get('/booking', (req, res) => {
    let user; // Declare user variable
    if (req.cookies.token) {
        try {
            user = jwt.verify(req.cookies.token, process.env.JWT_KEY); 
        } catch (err) {
            user = { email: "", username: "" }; 
        }
    } else {
        user = { email: "", username: "" }; 
    }
    res.render('booking', {user});
});

app.get('/book?:id', (req, res) => {
    res.render('book');
});

app.get('/about', (req, res) => { 
    res.render('aboutus');
});

app.get('/contact', (req, res) => {
    let user; // Declare user variable
    if (req.cookies.token) {
        try {
            user = jwt.verify(req.cookies.token, process.env.JWT_KEY); 
        } catch (err) {
            user = { email: "", username: "" }; 
        }
    } else {
        user = { email: "", username: "" }; 
    }
    res.render('contact', { user }); // Pass user to the view
});



app.post('/logout', (req, res) => { 
    res.clearCookie('token');
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});