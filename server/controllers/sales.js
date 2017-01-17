/**
 * Created by abarazarte on 16/01/17.
 */
var mongoose = require('mongoose');
var Book = require('../models/book');
var Sale = require('../models/sales');

//GET - Sales
exports.findAll = function(req, res){
    Sale.aggregate([
        {$unwind: '$book'},
        {
            $lookup:
            {
                from: "books",
                localField: "book",
                foreignField: "_id",
                as: "book"
            }
        },
        {$unwind: '$book'},
        {$unwind: '$book.authors'},
        {
            $lookup:
            {
                from: "authors",
                localField: "book.authors",
                foreignField: "_id",
                as: "book.authors"
            }
        },
        {$unwind: '$book.authors'},
        {
            $group : {
                _id : '$book.authors',
                revenue: { $sum: '$book.price' },
                count: { $sum: 1 },
                avg: { $avg: '$book.price' }
            }
        }
    ], function (err, _sales) {
        if (err) return res.status(500).send(err.message);

        res.status(200).jsonp(_sales);
    });
};


exports.listSales = function(req, res){
  Sale.find(function(err, sales){
      if (err) return res.status(500).send(err.message);

      res.status(200).send(sales);
  });
};

//GET - Generate random data
exports.generateRandom = function(req, res){
    Book.find(function(err, books){
        if(err) return res.status(500).send(err.message);

        var book = books[Math.floor(Math.random()*books.length)];

        var sale = new Sale({
            date:  randomDate(new Date(2016, 0, 1), new Date()),
            book:  book._id
        });

        sale.save(function(err, _sale){
            if(err)   return res.status(500).send(err.message);

            res.status(201).jsonp(_sale);
        });
    });
};


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
