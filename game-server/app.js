var express = require('express');
var path = require('path');
var app = express();

var rootPath = path.join(__dirname, '../');
app.use(express.static(rootPath));
app.set('views',rootPath);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index')
});

app.listen(3000);
console.log('server is on 3000 ...')