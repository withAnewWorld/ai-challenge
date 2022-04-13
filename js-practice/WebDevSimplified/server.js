const express =require('express');
const app = express();
app.set('view engine', 'ejs');

app.listen(3000); 
app.use(logger);

app.get('/', function(req, res){
  console.log('Here');
  res.render('index.ejs', {text: "world"});
});

const userRouter = require('./routes/users');

function logger(req, res, next){
  console.log(req.originalUrl);
  next();
}

app.use('/users', userRouter);
