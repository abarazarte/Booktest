var mongoose = require('mongoose');
var Author = require('../models/author');
var Book = require('../models/book');

// GET - Return all book genres
exports.getGenres = function(req, res){
    res.status(200).jsonp(['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']);
};


// GET - Return all books
exports.findAll = function(req, res){
    Book.find(function(err, books){
        if(err) res.send(500, err.message);
        console.log('GET /books');
        Author.populate(books, { path:'authors'}, function(err, books){
            if(err) res.send(500, err.message);
            res.status(200).jsonp(books);
        });
    });
};

// GET - Return a book by id
exports.find = function(req, res){
    Book.findById(req.params.id)
        .populate('authors')
        .exec(function(err, book){
            if(err) return res.status(404).send(err.message);
            console.log('GET /books/' + req.params.id);
            Author.populate(book, { path:'authors'}, function(err, book){
                if(err) res.send(500, err.message);
                res.status(200).jsonp(book);
            });
        });

    // Book.findById(req.params.id, function(err, book){
    //     if(err) return res.status(404).send(err.message);
    //     console.log('GET /books/' + req.params.id);
    //     Author.populate(book, { path:'authors'}, function(err, book){
    //         if(err) res.send(500, err.message);
    //         res.status(200).jsonp(book);
    //     });
    // });
};

//POST - Insert a new Book in the DB
exports.add = function(req, res){
    console.log('POST');
    console.log(req.body);

    var book = new Book({
        title:  req.body.title,
        genre:  req.body.genre,
        publicationDate:  req.body.publicationDate,
        publisher:  req.body.publisher,
        price:  req.body.price,
        authors: req.body.authors
    });

    book.save(function(err, _book){
        if(err)   return res.status(500).send(err.message);

        res.status(201).jsonp(_book._id);
    });
};

//PUT - Update author
exports.update = function(req, res){
    Book.findById(req.params.id, function(err, _book){
        if(err) return res.status(404).send(err.message);

        _book.title = req.body.title;
        _book.genre = req.body.genre;
        _book.publicationDate = req.body.publicationDate;
        _book.publisher = req.body.publisher;
        _book.price = req.body.price;
        _book.authors = req.body.authors;

        _book.save(function(err){
            if(err) return res.status(500).send(err.message);

            res.status(200).jsonp(_book);
        });
    });
};

//DELETE - Delete an author
exports.remove = function(req, res){
    Book.findById(req.params.id, function(err, _book){
        if(err) return res.status(404).send(err.message);

        _book.remove(function(err){
            if(err) return res.status(500).send(err.message);

            res.status(200).send();
        });
    });
};