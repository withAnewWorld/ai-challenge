module.exports = {
  html: function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB2 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
  
    </body>
    </html>
      `;
  },
  list: function(files){
    var list='<ul>';
    var i = 0;
    while(i<files.length){
      list = list + `<li><a href="/?id=${files[i].id}">${files[i].title}></a></li>`;
      i=i+1
    }
    list = list + '</ul>';
    return list;
  }
}


