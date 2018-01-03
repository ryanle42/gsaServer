const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  

app.post('/users', function (req, res) {
  const body = req.body
  console.log(body);
  res.set('Content-Type', 'application/json')
  res.send(
    JSON.stringify({
      success: true,
      msg: `You sent: ${body['email']} to Express`
    })
  );
});

app.listen(3000, () => console.log('listening on port 3000'));