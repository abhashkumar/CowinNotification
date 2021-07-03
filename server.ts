import express from 'express';
import { callAPI } from './COvin';
import { insertObject } from './dbUtil';
let path = require('path');
let fs = require('fs');

let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/covid19logo', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "covid19logo.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

app.post('/user-details', function (req, res) {
  let user = req.body;
  console.log(JSON.stringify(user));
  insertObject(user.email, user.district).then((data) => res.send(data));
});


app.listen(3000, function () {
  console.log('Listening on port 3000...')
  setInterval(callAPI, 30000);
})