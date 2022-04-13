const express = require('express');
const router = express.Router();



router.get('/', function(req, res){
  res.send('User List')
});

router.get('/new', function(req, res){
  res.send('User New Form');
});

router.post('/', function(req, res){
  res.send('create user');
});

router.get('/:id', function(req, res){
  res.send(`Get user with ID ${req.params.id}`);
  console.log(req.user)
});

// 같은 주소의 CRUD를 더 compact하게 쓸 수 있는 코드 cf)router.route
router.route("/:id").put(function(req, res){
  res.send(`Gupdate user with ID ${req.params.id}`);
}).delete(function(req, res){
  res.send(`delete user with ID ${req.params.id}`);
})
const users=[{name: 'kyle'}, {name: 'selly'}];
router.param('id', function(req, res, next, id){
  console.log(id);
  req.user=users[id];
  next();
});

module.exports=router;