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
const whitelist = ['file:///Users/nuriamari/Developer/Waterloop/Waterloop-Team-Manager/front-end/dist/index.html']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors());

// set session data to only save on change and initial modification
app.use(session({
    secret: 'waterwaterwater',
    resave: false,
    saveUninitialized: false,
}));

app.get('/name', (req, res) => res.send('Nuri'));
app.post('/login', (req, res) => {
    User.findOne({username: req.body.username, password: req.body.password }, (error, userData) => {
        if (error) throw error;
        res.setHeader(200, {'Content-Type': 'application/json'});
        if (!user) {
            var response = {
                'authStatus': 'denied',
                'message': 'no user found',
            };
            res.end(JSON.stringify(response));
        } else {
            var response = {
                'authSatus': 'success',
                'username': user.username,
            }    
            req.session.authenticated = true;
            res.end(JSON.stringify(response));
        }
    });
});

app.get('/authCheck', (req, res) => {

    res.setHeader(200, {'Content-Type': 'application/json'});
    if (req.session.authenticated) {
        var response = {
            'authStatus': 'success',
        };
        res.end(JSON.stringify(response));
    } else {
        var response = {
            'authStatus': 'denied',
        };
        res.end(JSON.stringify(response));
    }
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

