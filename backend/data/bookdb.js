var database = require('./database.js');

exports.getAllBooks = async function() {
    var books = await database.executeQuery("SELECT bookid, title, description, isbn, pages, year, publisher, checkedoutby, u.username as checkedoutbyname FROM book LEFT JOIN user as u ON book.checkedoutby = u.userid;", []);
    return books;
}
