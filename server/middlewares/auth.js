var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');

exports.isAuthenticated = function(req, res, next){
    //Check if authorization header is present
    if(!req.headers.authorization){
        return res
            .status(403)
            .send('Token not provided');
    }

    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    //Check token expiration date
    if(payload.exp <= moment().unix()){
        return res
            .status(401)
            .send('Token expired.')
    }

    req.user = payload.sub;
    next();
};