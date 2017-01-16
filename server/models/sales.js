/**
 * Created by abarazarte on 16/01/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Book = mongoose.model('Book');

var saleSchema = new Schema({
    date: Date,
    book: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model('Sale', saleSchema);