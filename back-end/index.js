const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 4000;
require('dotenv').config();

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true });

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

});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${port}!`));

