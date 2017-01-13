var mongoose = require('mongoose');
var Author = require('../models/author');

//GET - Return all authors
exports.findAll = function(req, res){
  Author.find(function(err, authors){
    if(err) res.send(500, err.message);
    console.log('GET /authors');
    res.status(200).jsonp(authors);
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

    author.remove(function(err){
      if(err) return res.status(500).send(err.message);

      res.status(200).send();
    });
  });
};
