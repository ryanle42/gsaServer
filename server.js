const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { loginUser, createUser } = require('./src/helpers/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  

app.post('/login', async function (req, res) {
  await loginUser(req, res);
});

app.post('/createUser', async function (req, res) {
  await createUser(req, res);
});

app.listen(3000, () => console.log('listening on port 3000'));