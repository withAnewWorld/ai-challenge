var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');
var template = require('./lib/template.js');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '111111',
  database: 'opentutorials'
});

db.connect();

const { response } = require('express');
var app = http.createServer(function(req, res){
  var _url = req.url;
  var queryData = url.parse(_url, true).query;
  var pathname= url.parse(_url, true).pathname
  if (pathname === '/') {
    if(queryData.id ===undefined){
      // fs.readdir('./data', function(err, files){

      // var title = 'Welcome';
      // var description = "Hello, Node.js";
      // var list = template.list(files);
      // var html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`,
      // `<a href="/create">create</a>`);
      //   res.writeHead(200);
      //   res.end(html);
      // })

    db.query(`SELECT * FROM topic`, function(err, topics){
      var title = 'Welcome';
      var description = "Hello, Node.js";;
      var list = template.list(topics);
      var html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`,
      `<a href="/create">create</a>`);
      res.writeHead(200);
      res.end(html);
    });  
    
    } else{  
      /*
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf8',
        function (err, description) {
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description);
          fs.readdir('./data', function(err, files){
          var list = template.list(files);
          var html = template.html(sanitizedTitle, list, `<h2>${title}</h2><p>${sanitizedDescription }</p>`,
          `<a href="/create">create</a> 
          <a href="/update?id=${sanitizedTitle}">update</a>
          <form action="delete_process" method="post">
            <input type='hidden' name='id' value="${title}">
            <input type="submit" value="delete">
          </form>`);
          res.writeHead(200);
          res.end(html);
          });
    })*/
    db.query(`SELECT * FROM topic`, function(err, topics){
      if(err){
        throw err;
      }
      db.query(`SELECT * FROM topic where id=?`,[queryData.id], function(err, topic){
        if(err){
          throw err;
        }
        var title = topic[0].title;
        var description = topic[0].description;
        var list = template.list(topics);
        var html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`,
        `<a href="/create">create</a> 
        <a href="/update?id=${queryData.id}">update</a>
        <form action="delete_process" method="post">
        <input type='hidden' name='id' value="${queryData.id}">
        <input type="submit" value="delete">`);
        res.writeHead(200);
        res.end(html);
      })

    });  
  }
  }else if(pathname ==='/create'){
    
      db.query(`SELECT * FROM topic`, function(err, topics){
        var title = 'Create';
        var list = template.list(topics);
        var html = template.html(title, list, `
        <form action="/create_process" method="post">
  <p><input type="text" name="title" placeholder="title"></p>
  <p>
    <textarea name="description" placeholder="description"></textarea>
  </p>
  <p>
    <input type="submit">
  </p>
</form>`, ''
        ,
        `<a href="/create">create</a>`);
        res.writeHead(200);
        res.end(html);
      });
  } else if(pathname==='/create_process'){
    var body='';
    req.on('data', function(data){
      body = body + data;
    });
    req.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      db.query(`
      INSERT INTO topic (title, description, 
        created, author_id) VALUES(?, ?, NOW(), ?)`,
        [post.title, post.description, 1], function(err, results){
          if(err){
            throw err;
          }
          res.writeHead(302, {Location: `/?id=${results.insertId}`});
          res.end('success'); 
        })

    });
  } else if (pathname ==='/update'){
    db.query(`SELECT * FROM topic`, function(err, topics){
      if(err){
        throw err;
      }
      db.query(`SELECT * FROM topic where id=?`,[queryData.id], function(err, topic){
        if(err){
          throw err;
        }
    

      var list = template.list(topics);
      var html = template.html(topic[0].title, list, `
      <form action="/update_process" method="post">
      <input type="hidden" name="id" value="${topic[0].id}">
  <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
  <p>
    <textarea name="description" placeholder="description">${topic[0].description}</textarea>
  </p>
  <p>
    <input type="submit">
  </p>
</form>`
      ,
      `<a href="/create">create</a> <a href="/update/?id=${topic[0].id}">update</a>`);
      res.writeHead(200);
      res.end(html);
      });
  }
  )} else if (pathname==='/update_process'){
    var body='';
    req.on('data', function(data){
      body = body + data;
    });
    req.on('end', function(){
      var post = qs.parse(body);

      // fs.rename(`data/${id}`, `data/${title}`, function(err){
      //   fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      //     res.writeHead(302, {Location: `/?id=${title}`});
      //     res.end('success'); 
      //   })
      // })
      db.query(`UPDATE topic SET title=?, description=?, author_id=1 WHERE id=?`,
      [post.title, post.description, post.id], function(err, results){
        res.writeHead(302, {Location: `/?id=${post.id}`});
        res.end('success'); 
      });
  });

  }else if (pathname==='/delete_process'){
    var body='';
    req.on('data', function(data){
      body = body + data;
    });
    req.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(err){
        res.writeHead(302, {Location: `/`});
        res.end('success'); 
      })

  });

  }
  else{
    res.writeHead(404);
    res.end('Not found');
  }
  
  
});
app.listen(3000);