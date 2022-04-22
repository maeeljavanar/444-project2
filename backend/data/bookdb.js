var database = require('./database.js');

exports.getAllBooks = async function() {
    var books = await database.executeQuery("SELECT bookid, title, description, isbn, pages, year, publisher, checkedoutby, u.username as checkedoutbyname FROM book LEFT JOIN user as u ON book.checkedoutby = u.userid;", []);
    return books;
}

exports.getBookById = async function(bookid) {
    var book = await database.executeQuery("SELECT bookid, title, description, isbn, pages, year, publisher, checkedoutby, u.username as checkedoutbyname FROM book LEFT JOIN user as u ON book.checkedoutby = u.userid WHERE bookid = ?;", [bookid]);
    return book[0];
}

exports.insertBook = async function(book) {
    let bookid = await database.executeQuery('SELECT MAX(bookid) AS id FROM book', []);
    bookid = bookid[0].id;
    if(bookid == null) {
        bookid = 1;
    } else {
        bookid += 1;
    }
    var response = await database.executeQuery("INSERT INTO book(bookid, title, description, isbn, pages, year, publisher, checkedoutby) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [bookid, book.title, book.description, book.isbn, book.pages, book.year, book.publisher, book.checkedoutby]);
    if(response && response.affectedRows == 1) {
        return bookid;
    } else {
        return false;
    }
}

exports.deleteBook = async function(bookid) {
    var response = await database.executeQuery("DELETE FROM book WHERE bookid = ?", [bookid]);
    if(response && response.affectedRows == 1) {
        return bookid;
    } else {
        return false;
    }
}

exports.updateBook = async function(book) {

    //bookid required, should always evaluate false
    if(!book.bookid) {
        return false;
    }

    let sql = "UPDATE book SET ";
    let params = [];

    if(book.title) {
        sql += "title = ?, ";
        params.push(book.title);
    }

    if(book.description) {
        sql += "description = ?, ";
        params.push(book.description);
    }

    if(book.isbn) {
        sql += "isbn = ?, ";
        params.push(book.isbn);
    }

    if(book.pages) {
        sql += "pages = ?, ";
        params.push(book.pages);
    }

    if(book.year) {
        sql += "year = ?, ";
        params.push(book.year);
    }

    if(book.publisher) {
        sql += "publisher = ?, ";
        params.push(book.publisher);
    }

    if(book.checkedoutby || book.checkedoutby === null) {
        sql += "checkedoutby = ?, ";
        params.push(book.checkedoutby);
    }

    //remove trailing ,
    sql = sql.slice(0, sql.length - 2);

    //add where clause
    sql += " WHERE bookid = ?";
    params.push(book.bookid);

    var response = await database.executeQuery(sql, params);
    if(response && response.affectedRows == 1) {
        return true;
    } else {
        return false;
    }
}