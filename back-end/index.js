const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// db models
const User = require('./models/user');
const OnboardingCode = require('./models/onboardingcode');

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


app.post('/login', (req, res) => {
    User.findOne({username: req.body.username}, (error, userData) => {
        if (error) throw error;
        res.setHeader('200', {'Content-Type': 'application/json'});
        if (!userData) {
            var response = {
                'authStatus': false,
                'user': false,
                'password': false,
            };
            res.end(JSON.stringify(response));
        } else {
            if (userData.password === req.body.password) {
                var response = {
                    'authStatus': true,
                    'password': true,
                    'user': true,
                    'username': userData.username,
                }   
            } else {
                var response = {
                    'authStatus': false,
                    'password': false,
                    'user': true,
                    'username': userData.username,
                }
            }
            req.session.authenticated = true;
            req.session.userId = userData.id;
            console.log(req.session.id);
            res.end(JSON.stringify(response));
        }
    });
});

app.post('/newUser', (req,res) => {
    res.setHeader('200', {'Content-Type': 'application/json'});
    OnboardingCode.findOne({code: req.body.code}, (err, data) => {
        let response;
        if (data) {
            let user = new User();
            user.name = req.body.firstname + " " + req.body.lastname;
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.password = req.body.password;
            user.admin = data.admin;
            user.save((err) => {});
            OnboardingCode.deleteOne({code: req.body.code}, (err) => {});
            response = {
                codeValid: true,
            };
            res.end(JSON.stringify(response));
        } else {
            response = {
                codeValue: false,
            }
            res.end(JSON.stringify(response));
        }
    });
});

app.post('/logout', (req, res) => {
    req.session.authenticated = false;
    res.end();
});

app.get('/user', (req, res) => {
    User.findOne({_id: req.session.userId}, (err, userData) => {
        res.setHeader('200', {'Content-Type': 'application/json'});
        if (!userData) {
            throw("A user with active session should always exist");
        } else {
            res.end(JSON.stringify(userData));
        }
    });
});

app.get('/allUsers', (req, res) => {
    if (req.session.authenticated) {
        User.findOne({_id: req.session.userId}, (err, userData) => {
            if (err) throw err;
            if (userData.admin) {
                User.find({}, (error, data) => {
                    if (error) throw error;
                    res.setHeader('200', {'Content-Type': 'application/json'}); 
                    res.end(data);
                });
            }
        });
    } else {
        res.end("request denied");
    }
});

app.get('/authCheck', (req, res) => {
    res.setHeader('200', {'Content-Type': 'application/json'});
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

