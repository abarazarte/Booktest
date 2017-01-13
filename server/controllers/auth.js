var mongoose = require('mongoose');
var User = require('../models/user');
var tokenService = require('../services/token');

// POST - Login
exports.login = function(req, res){
  User.findOne({username: req.body.username.toLowerCase()}, function(err, user){
    if(err) return res.status(500).send(err.message);

    if(!user) return res.status(404).send('User:' + req.body.username + ' not found');

    if(!user.isValidPassword(req.body.password)) return res.status(401).send('Invalid credentials');

    return res
        .status(200)
        .send({
            userId: user._id,
            token: tokenService.createToken(user),
            tokenType: 'Bearer'
        })
  });
};

//POST - Sign up
exports.signup = function(req, res){
    User.findOne({username: req.body.username.toLowerCase()}, function(err, user){
        if(err) return res.status(500).send(err.message);

        if(user) return res.status(403).send('User:' + req.body.username + ' is already registered');

        var _user = new User({
            username: req.body.username
        });
        _user.password = _user.cryptPassword(req.body.password);

        _user.save(function(err, u){
            if(err) return res.status(500).send(err.message);

            return res
                .status(201)
                .send({
                    _id: u._id
                })
        });
    });
};