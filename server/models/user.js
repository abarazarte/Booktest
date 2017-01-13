var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:  { type: String },
    password:  { type: String },
    created_at:  { type: Date, default: Date.now }
});

//Methods

//Salt and Hash password
userSchema.methods.cryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Check if password is valid
userSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);