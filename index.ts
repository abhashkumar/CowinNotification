import express from 'express';
var app = express();

app.get('/', function (req:any, res:any) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Listening on port 3000...')
})