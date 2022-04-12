const express =require('express');
// const dotenv = require("dotenv").config()
const bodyParser=require('body-parser');
const port = 5000;
const app = process.env.PORT || express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb+srv://ljh6887:fkturus5@cluster0.tau6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
function(err, client){
  if(err) return console.log(err)

  db = client.db('todoapp');

  app.listen(port, ()=> console.log(`server started on port ${port}`));
});

app.get('/', function(req, res){
  res.render(__dirname + '/views/index.ejs');
});

app.get('/write', function(req, res){
  res.render(__dirname + '/views/write.ejs');
});

app.post('/add', function(req,res){
  res.send('전송완료');
  db.collection('counter').findOne({name: 'numOfPosts'}, 
  function(err, results){
    var total = results.totalPost;

    db.collection('post').insertOne({_id: total+1, title: req.body.title, date: req.body.date}, 
      function(err, results){
        //Counter collection 안 totalPost += 1
        db.collection('counter').updateOne({name: 'numOfPosts'}, {$inc:{totalPost: 1}}, function(err, results){
          if(err) return console.log(err);
        })
      });
  });
  
  });
  
app.get('/list', function(req, res){
  db.collection('post').find().toArray(function(err, results){
    res.render('list.ejs', {posts: results});
  });
});

app.delete('/delete', function(req, res){
  console.log(req.body);
  req.body._id = parseInt(req.body._id);
  db.collection('post').deleteOne(req.body, function(err, results){
    console.log('success');
    res.status(200).send({message: 'success'});
  })
})

app.get('/detail/:id', function(req, res){
  db.collection('post').findOne({_id: parseInt(req.params.id)}, function(err, results){
    res.render('detail.ejs', {data: results});
  })
})

app.get('/edit/:id', function(req, res){
  db.collection('post').findOne({_id: parseInt(req.params.id)}, function(err, results){
    res.render('edit.ejs', {data: results});
  })
})

app.put('/edit', function(req, res){
  db.collection('post').updateOne({_id: parseInt(req.body.id)}, {$set: {title: req.body.title, date: req.body.date}}, 
    function(err, results){
      console.log('edit success');
      res.redirect('/list');
    })
})