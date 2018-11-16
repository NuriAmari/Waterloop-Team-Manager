const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// db models
const User = require('./models/user');

// connect to db
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true }, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("db connection established");
    }
});

// create a list of domains to white list from cors protection
const whitelist = ['file:///Users/nuriamari/Developer/Waterloop/Waterloop-Team-Manager/front-end/dist/index.html', 'http://localhost:8080']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST'],
    credentials: true // enable set cookie
}));

app.use(express.json());

// set session data to only save on change and initial modification
app.use(session({
    secret: 'waterwaterwater',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/react*', (req, res) => {
  res.sendFile('/public/index.html');
});

app.post('/login', (req, res) => {
    User.findOne({username: req.body.username, password: req.body.password }, (error, userData) => {
        if (error) throw error;
        res.setHeader('200', {'Content-Type': 'application/json'});
        if (!userData) {
            var response = {
                'authStatus': false,
                'message': 'no user found',
            };
            res.end(JSON.stringify(response));
        } else {
            var response = {
                'authStatus': true,
                'username': userData.username,
            }    
            req.session.authenticated = true;
            req.session.userId = userData.id;
            console.log(req.session.id);
            res.end(JSON.stringify(response));
        }
    });
});

app.get('/authCheck', (req, res) => {
    //console.log(req);
    res.setHeader('200', {'Content-Type': 'application/json'});
    console.log(req.session.id);
    if (req.session.authenticated) {
        var response = {
            'authStatus': true,
        };
        res.end(JSON.stringify(response));
    } else {
        var response = {
            'authStatus': false,
        };
        res.end(JSON.stringify(response));
    }
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

