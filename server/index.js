var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  moongose = require('mongoose'),
  cors = require('cors');

var AuthCtrl = require('./controllers/auth');
var authMiddleware = require('./middlewares/auth');

var AuthorCtrl = require('./controllers/authors');
var BookCtrl = require('./controllers/books');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride());

// Auth endpoints
var auth = express.Router();
auth.route('/login')
    .get(AuthCtrl.login);

auth.route('/signup')
    .post(AuthCtrl.signup);

app.use('/api/v1/auth', auth);


//Authors endpoints
var authors = express.Router();

authors.route('/authors')
  .all(authMiddleware.isAuthenticated)
  .get(AuthorCtrl.findAll)
  .post(AuthorCtrl.add);

authors.route('/authors/:id')
  .all(authMiddleware.isAuthenticated)
  .get(AuthorCtrl.find)
  .put(AuthorCtrl.update)
  .delete(AuthorCtrl.remove);

app.use('/api/v1', authors);

//Books endpoints
var books = express.Router();

books.route('/books/genres')
    .all(authMiddleware.isAuthenticated)
    .get(BookCtrl.getGenres);

books.route('/books')
    .all(authMiddleware.isAuthenticated)
    .get(BookCtrl.findAll)
    .post(BookCtrl.add);

books.route('/books/:id')
    .all(authMiddleware.isAuthenticated)
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
