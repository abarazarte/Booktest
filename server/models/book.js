var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Author = mongoose.model('Author');

var bookSchema = new Schema({
    title: String,
    authors: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
    genre:    { type: String, enum:
        ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']
    },
    publicationDate: Date,
    publisher: String,
    price: Number,
    status: { type: String, enum:
        ['OK', 'ARCHIVED'], default: 'OK'
    }
});

module.exports = mongoose.model('Book', bookSchema);
