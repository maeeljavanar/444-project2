var bookdb = require('../data/bookdb.js');

exports.getAllBooks = async function(callback) {
    callback(await bookdb.getAllBooks());
}   

exports.getBook = async function(bookid, callback) {
    callback(await bookdb.getBookById(bookid));
}

exports.addBook = async function(book, callback) {

    //title is minimally required
    if(!book.title) {
        callback(false);
        return;
    }

    callback(await bookdb.insertBook(book));
}

exports.updateBook = async function(book, callback) {

    //id is required
    if(!book.bookid) {
        console.log("Update book request missing bookid");
        callback(false);
        return;
    }

    //there is nothing to update if only id is included
    if(Object.keys(book).length < 2) {
        console.log("Update book request book object has 1 or fewer keys: ", JSON.stringify(book));
        callback(false);
        return;
    }

    callback(await bookdb.updateBook(book));
}

exports.deleteBook = async function(bookid, callback) {
    callback(await bookdb.deleteBook(bookid));
}