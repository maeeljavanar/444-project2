const config = require('../config.json');
var express = require('express');
var router = express.Router();
var user = require('../business/user.js');
var book = require('../business/book.js');
var jwt = require('jsonwebtoken');

/**
 * Backend Routes
 */
router.post('/createAccount', function(req, res) {
  user.createAccount(req.body.username, req.body.password, userid => {
    if(userid != undefined) {
      generateToken(req, userid, token => {
        res.json({"success": true, "token": token});
      });
    } else {
      res.json({"success": false});
    }
  });
});

router.post('/login', function(req, res, next) {
  console.log("hi")
  user.login(req.body.username, req.body.password, userid => {
    if(userid) {
      generateToken(req, userid, token => {
        res.json({"success": true, "token": token});
      });
    } else {
      res.json({"success": false});
    }
  })
});

router.post('/book', function(req, res) {
  let requestJWT = validateToken(req.body.token);
  if(requestJWT) {
    book.addBook({
      "title": req.body.title,
      "description": req.body.description,
      "isbn": req.body.isbn,
      "pages": req.body.pages,
      "year": req.body.year,
      "publisher": req.body.publisher
    }, success => {
      if(success) {
        res.json({
          "success": true,
          "message": "Book was successfully deleted"
        });
      } else {
        res.json({
          "success": false,
          "message": "An error occured deleting book. View server for more details."
        });
      }
    });
  } else {
    res.send(401, 'Unauthorized');
  }
});

router.put('/book', function(req, res) {
  let requestJWT = validateToken(req.body.token);
  if(requestJWT) {
    if(req.query.bookid) {
      let book = {};

      //add all included params to book object
      if(req.body.title) {
        book.title = req.body.title;
      }
      if(req.body.description) {
        book.description = req.body.description;
      }
      if(req.body.isbn) {
        book.isbn = req.body.isbn;
      }
      if(req.body.pages) {
        book.pages = req.body.pages;
      }
      if(req.body.year) {
        book.year = req.body.year;
      }
      if(req.body.publisher) {
        book.publisher = req.body.publisher;
      }

      book.updateBook(book, success => {
        if(success) {
          res.json({
            "success": true,
            "message": "Book was successfully deleted"
          });
        } else {
          res.json({
            "success": false,
            "message": "An error occured deleting book. View server for more details."
          });
        }
      });
    } else {
      res.json({"error": "bookid is required"});
    }
  } else {
    res.send(401, 'Unauthorized');
  }
});

router.delete('/book', function(req, res) {
  let requestJWT = validateToken(req.body.token);
  if(requestJWT) {
    if(req.query.bookid) {
      book.deleteBook(req.query.bookid, success => {
        if(success) {
          res.json({
            "success": true,
            "message": "Book was successfully deleted"
          });
        } else {
          res.json({
            "success": false,
            "message": "An error occured deleting book. View server for more details."
          });
        }
      });
    } else {
      res.json({"error": "bookid is required"});
    }
  } else {
    res.send(401, 'Unauthorized');
  }
});

//get one
router.get('/book', function(req, res) {

  if(req.query.bookid) {
    book.getBook(req.query.bookid, books => {
      res.json(books);
    });
  } else {
    res.json({"error": "bookid is required"});
  }
  
});

//get all
router.get('/books', function(req, res) {
  book.getAllBooks(books => {
    res.json(books);
  });
});

function generateToken(req, userid, callback) {
  
  user.createSessionToken(userid, result => {
    if(result) {
      var token = jwt.sign({
        "name": req.body.username,
        "token": result
      }, config.jwtSecret,
      {
        subject: `${userid}`,
        expiresIn: '24h'
      });
  
    callback(token);
    } else {
      callback(false);
    }
  });

}

function validateToken(token) {

  try {
    var decoded = jwt.verify(token, config.jwtSecret);
    if(decoded) {
      user.validateToken(decoded.token);
    } else {
      return false;
    }
  } catch(err) {
    console.log(err);
    return false;
  }

}

module.exports = router;
