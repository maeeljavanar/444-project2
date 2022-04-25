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

    let newBook = {};

    //add all included params to book object
    if(req.body.title) {
      newBook.title = req.body.title;
    } else {
      newBook.title = null;
    }
    if(req.body.description) {
      newBook.description = req.body.description;
    }else {
      newBook.description = null;
    }
    if(req.body.isbn) {
      newBook.isbn = req.body.isbn;
    }else {
      newBook.isbn = null;
    }
    if(req.body.pages) {
      newBook.pages = req.body.pages;
    }else {
      newBook.pages = null;
    }
    if(req.body.year) {
      newBook.year = req.body.year;
    }else {
      newBook.year = null;
    }
    if(req.body.publisher) {
      newBook.publisher = req.body.publisher;
    }else {
      newBook.publisher = null;
    }
    if(req.body.checkedoutby) {
      newBook.checkedoutby = req.body.checkedoutby;
    }else {
      newBook.checkedoutby = null;
    }
    book.addBook(newBook, success => {
      if(success) {
        res.json({
          "success": true,
          "message": "Book was successfully added"
        });
      } else {
        res.json({
          "success": false,
          "message": "An error occured adding book. View server for more details."
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
    if(req.body.bookid) {
      let updateBook = {bookid: req.body.bookid};

      //add all included params to book object
      if(req.body.title) {
        updateBook.title = req.body.title;
      }
      if(req.body.description) {
        updateBook.description = req.body.description;
      }
      if(req.body.isbn) {
        updateBook.isbn = req.body.isbn;
      }
      if(req.body.pages) {
        updateBook.pages = req.body.pages;
      }
      if(req.body.year) {
        updateBook.year = req.body.year;
      }
      if(req.body.publisher) {
        updateBook.publisher = req.body.publisher;
      }
      if(req.body.checkedoutby) {
        updateBook.checkedoutby = req.body.checkedoutby;
      } else if(req.body.checkedoutby === null || req.body.checkedoutby == '' || req.body.checkedoutby < 0) {
        updateBook.checkedoutby = null;
      }

      book.updateBook(updateBook, success => {
        if(success) {
          res.json({
            "success": true,
            "message": "Book was successfully updated"
          });
        } else {
          res.json({
            "success": false,
            "message": "An error occured updating book. View server for more details."
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
  console.log(req.body.token)
  let requestJWT = validateToken(req.body.token);
  if(requestJWT) {
    if(req.body.bookid) {
      book.deleteBook(req.body.bookid, success => {
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
      return user.validateToken(decoded.token);
    } else {
      return false;
    }
  } catch(err) {
    console.log(err);
    return false;
  }

}

module.exports = router;
