const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

app.use(cors());

app.get('/name', (req, res) => res.send('Nuri'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

