var mongoose = require('mongoose');
var User = require('../models/user');
var tokenService = require('../services/token');

// GET - Login / get token
exports.login = function(req, res){
    if(!req.headers.authorization){
        return res
            .status(401)
            .send('Token not provided');
    }
    var headerString = new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString();

  User.findOne({username: headerString.split(':')[0].toLowerCase()}, function(err, user){
    if(err) return res.status(500).send(err.message);

    if(!user) return res.status(404).send('User:' + headerString.split(':')[0] + ' not found');

    if(!user.isValidPassword(headerString.split(':')[1])) return res.status(401).send('Invalid credentials');

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