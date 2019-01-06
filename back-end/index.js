// TODO actually do some error handling

const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

// db models
const User = require('./models/user');
const OnboardingCode = require('./models/onboardingcode');

// connect to db
mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true },
    error => {
        if (error) {
            console.log(error);
        } else {
            console.log('db connection established');
        }
    }
);

// create a list of domains to white list from cors protection
const whitelist = [
    'file:///Users/nuriamari/Developer/Waterloop/Waterloop-Team-Manager/front-end/dist/index.html',
    'http://localhost:8080',
];

const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(
    cors({
        origin: ['http://localhost:8080'],
        methods: ['GET', 'POST'],
        credentials: true, // enable set cookie
    })
);

app.use(express.json());

app.use(bodyParser.json());

// set session data to only save on change and initial modification
app.use(
    session({
        secret: 'waterwaterwater',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (error, userData) => {
        if (error) throw error;
        res.setHeader('200', { 'Content-Type': 'application/json' });
        if (!userData) {
            var response = {
                authStatus: false,
                user: false,
                password: false,
            };
            res.end(JSON.stringify(response));
        } else {
            if (userData.password === req.body.password) {
                var response = {
                    authStatus: true,
                    password: true,
                    user: true,
                    username: userData.username,
                };
            } else {
                var response = {
                    authStatus: false,
                    password: false,
                    user: true,
                    username: userData.username,
                };
            }
            req.session.authenticated = true;
            req.session.userId = userData.id;
            req.session.admin = userData.admin;
            console.log(req.session.id);
            res.end(JSON.stringify(response));
        }
    });
});

app.post('/newUser', (req, res) => {
    const code = new OnboardingCode();
    code.adminCode = req.body.admin;
    code.team = req.body.subteam;
    code.email = req.body.email;
    code.code = `${req.body.firstname.substring(0, 1)}${req.body.lastname}@${
        req.body.subteam
    }${new Date().getFullYear()}`;
    console.log(code.code);
    code.save(err => {
        if (err) throw err;
    });
    res.end();
});

app.post('/registerUser', (req, res) => {
    const { onboardingcode, firstname, lastname, password } = req.body;
    OnboardingCode.findOne({ code: onboardingcode }, async (err, data) => {
        const response = { registerSuccessfull: false };
        res.setHeader('200', { 'Content-Type': 'application/json' });
        if (data) {
            console.log(data);
            const user = new User();
            user.email = data.email;
            user.firstname = firstname;
            user.lastname = lastname;
            user.username = firstname + lastname;
            user.password = password;
            user.team = data.team;
            user.admin = data.adminCode;
            await user.save();
            await data.remove();
            response.registerSuccessfull = true;
        }
        res.end(JSON.stringify(response));
    });
});

app.post('/logout', (req, res) => {
    req.session.authenticated = false;
    res.end();
});

app.get('/user', (req, res) => {
    User.findOne({ _id: req.session.userId }, (err, userData) => {
        res.setHeader('200', { 'Content-Type': 'application/json' });
        if (!userData) {
            throw 'A user with active session should always exist';
        } else {
            res.end(JSON.stringify(userData));
        }
    });
});

app.get('/allUsers', (req, res) => {
    if (req.session.authenticated) {
        User.findOne({ _id: req.session.userId }, (err, userData) => {
            if (err) throw err;
            if (userData.admin) {
                User.find({}, (error, data) => {
                    if (error) throw error;
                    res.setHeader('200', {
                        'Content-Type': 'application/json',
                    });
                    console.log(data);
                    res.end(JSON.stringify(data));
                });
            }
        });
    } else {
        res.end('request denied');
    }
});

app.get('/authCheck', (req, res) => {
    res.setHeader('200', { 'Content-Type': 'application/json' });
    const response = {
        authStatus: req.session.authenticated,
        admin: req.session.admin,
    };
    res.end(JSON.stringify(response));
});

app.get('/getResources', (req, res) => {
    res.setHeader('200', { 'Content-Type': 'application/json' });
    console.log(req);
    User.findOne({ _id: req.session.userId }, (err, userData) => {
        if (userData) {
            console.log(userData);
            res.end(JSON.stringify(userData));
        } else {
            console.log('no user found');
            res.end(JSON.stringify({ msg: 'No user found' }));
        }
    });
});

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
);
