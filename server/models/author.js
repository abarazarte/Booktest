var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  var authorSchema = new Schema({
    firstName:  { type: String },
    lastName:  { type: String },
    city:  { type: String },
    state:  { type: String },
    zip:  { type: Number },
    phone:  { type: String }
  });

module.exports = mongoose.model('Author', authorSchema);
