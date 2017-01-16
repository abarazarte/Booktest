/**
 * Created by abarazarte on 16/01/17.
 */
var mongoose = require('mongoose');
var Author = require('../models/author');
var Book = require('../models/book');
var Sale = require('../models/sales');

//GET - Sales
exports.findAll = function(req, res){
    // Sale.aggregate([
    //     {
    //         $group: {
    //             _id: '$book.$authors',  //$region is the column name in collection
    //             count: {$sum: 1}
    //         }
    //     }
    // ], function (err, result) {
    //     if (err) {
    //         next(err);
    //     } else {
    //         console.log(result)
    //     }
    // });
    // Sale.find(function(err, sales){
    //     if(err) res.send(500, err.message);
    //     console.log('GET /sales');
    //     Book.populate(sales, { path:'book'}, function(err, sales){
    //         if(err) res.send(500, err.message);
    //         Author.populate(sales.book, { path:'book.authors'}, function(err, sales){
    //             if(err) res.send(500, err.message);
    //             res.status(200).jsonp(sales);
    //         });
    //     });
    // });
    Sale.findOne()
        .populate({
        path: 'book',
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: 'authors' }
        })
        .exec(function(err, sales){
            if(err) res.send(500, err.message);
            res.status(200).jsonp(sales);
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
