var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  moongose = require('mongoose');

var AuthorCtrl = require('./controllers/authors');
var BookCtrl = require('./controllers/books');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var authors = express.Router();

authors.route('/authors')
  .get(AuthorCtrl.findAll)
  .post(AuthorCtrl.add);

authors.route('/authors/:id')
  .get(AuthorCtrl.find)
  .put(AuthorCtrl.update)
  .delete(AuthorCtrl.remove);

app.use('/api/v1', authors);

var books = express.Router();

books.route('/books/genres')
    .get(BookCtrl.getGenres);

books.route('/books')
    .get(BookCtrl.findAll)
    .post(BookCtrl.add);

books.route('/books/:id')
    .get(BookCtrl.find)
    .put(BookCtrl.update)
    .delete(BookCtrl.remove);

app.use('/api/v1', books);

moongose.connect('mongodb://localhost/nuvector', function(err, res){
  if(err){
    console.log('ERROR: connecting to Database. ' + err);
  }
  else{
    app.listen(3000, function(){
      console.log("API server running on http://localhost:3000");
    });
  }
});
