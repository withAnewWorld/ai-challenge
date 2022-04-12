const express = require('express');
const bodyParser= require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res)=>{
  res.send([
    {
      'id': 1,
      'img': 'https://placeimg.com/64/64/1',
      'name' : 'hongKillDong',
      'birthday': '960719',
      'gender': 'man',
      'job': 'student'
    },
    {
      'id': 2,
      'img': 'https://placeimg.com/64/64/2',
      'name' : 'NaDongBin',
      'birthday': '97107',
      'gender': 'man',
      'job': 'programmer'
    },
    {
      'id': 3,
      'img': 'https://placeimg.com/64/64/3',
      'name' : 'YunHo',
      'birthday': '95202',
      'gender': 'Woman',
      'job': 'gamer'
    }
  ]);
});

app.listen(port, ()=> console.log(`listening on port ${port}`));