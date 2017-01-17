var mongoose = require('mongoose');
var Author = require('../models/author');
var Book = require('../models/book');

//GET - Return all authors
exports.findAll = function(req, res){
  var _skip = req.query.skip;
  var _limit = req.query.limit;

  Author.count(function(err, _count) {
    if(err) return res.status(500).send(err.message);
    Author.find()
        .skip(_skip)
        .limit(_limit)
        .exec(function(err, authors){
          if(err) res.send(500, err.message);
          console.log('GET /authors');
          var tmp = {
            total: _count,
            skip: _skip,
            limit: _limit,
            data: authors
          };
          res.status(200).jsonp(tmp);
        });
  });
};

//GET - Return an author by id
exports.find = function(req, res){
  Author.findById(req.params.id, function(err, author){
    if(err) return res.status(404).send(err.message);

    console.log('GET /authors/' + req.params.id);
    res.status(200).jsonp(author);
  });
};

//POST - Insert a new Author in the DB
exports.add = function(req, res){
  console.log('POST');
  console.log(req.body);

  var author = new Author({
    firstName:  req.body.firstName,
    lastName:  req.body.lastName,
    city:  req.body.city,
    state:  req.body.state,
    zip:  req.body.zip,
    phone:  req.body.phone
  });

  author.save(function(err, author){
    if(err)   return res.status(500).send(err.message);
    res.status(201).jsonp(author);
  });
};

//PUT - Update author
exports.update = function(req, res){
  Author.findById(req.params.id, function(err, author){
    if(err) return res.status(404).send(err.message);

    author.firstName = req.body.firstName;
    author.lastName = req.body.lastName;
    author.city = req.body.city;
    author.state = req.body.state;
    author.zip = req.body.zip;
    author.phone = req.body.phone;

    author.save(function(err){
      if(err) return res.status(500).send(err.message);

      res.status(200).jsonp(author);
    });
  });
};

//DELETE - Delete an author
exports.remove = function(req, res){
  Author.findById(req.params.id, function(err, author){
    if(err) return res.status(404).send(err.message);

    Book.find({authors: {$elemMatch: author._id }}, function(err, books){
      if(err) return res.status(404).send(err.message);
      books.map(function(book){
        book.authors.remove(author._id);

      });
      author.remove(function(err){
        if(err) return res.status(500).send(err.message);
        res.status(200).send();
      });
    });
  });
};
