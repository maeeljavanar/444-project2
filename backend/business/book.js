var bookdb = require('../data/bookdb.js');

exports.getAllBooks = async function(callback) {
    callback(await bookdb.getAllBooks());
}   