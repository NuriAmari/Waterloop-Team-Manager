const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

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

app.get('/name', (req, res) => res.send('Nuri'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

