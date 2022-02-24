var express = require('express');
var app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main.hbs',
  layoutsDir: path.join(__dirname, 'views/defaultLayouts'),
  partialsDir: path.join(__dirname, 'views/components'),

  helpers: {},
});

app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('home', {
    test: 'home page',
  });
});
app.get('/music', function (req, res) {
  res.render('music', {
    test: 'music page',
  });
});
app.listen(3000, console.log('server run on port 3000'));
