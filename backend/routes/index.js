const config = require('../config.json');
var express = require('express');
var router = express.Router();
var user = require('../business/user.js');
var jwt = require('jsonwebtoken');

/**
 * Backend Routes
 */
router.post('/createAccount', function(req, res) {
  user.createAccount(req.body.username, req.body.password, userid => {
    if(userid != undefined) {
      var token = generateToken(req, userid);
      res.json({"success": true, "token": token});
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
    //do the thing
  } else {
    res.send(401, 'Unauthorized');
  }
});

router.put('/book', function(req, res) {
  let requestJWT = validateToken(req.body.token);
  if(requestJWT) {
    //do the thing
  } else {
    res.send(401, 'Unauthorized');
  }
});

//get one
router.delete('/book', function(req, res) {
  let requestJWT = validateToken(req.body.token);
  if(requestJWT) {
    //do the thing
  } else {
    res.send(401, 'Unauthorized');
  }
});

//get all
router.get('/books', function(req, res) {
  let requestJWT = validateToken(req.body.token);
  if(requestJWT) {
    //do the thing
  } else {
    res.send(401, 'Unauthorized');
  }
});

function generateToken(req, userid, callback) {
  
  user.createSessionToken(userid, result => {
    if(success) {
      var token = jwt.sign({
        "name": req.body.username,
        "token": user.createSessionToken(userid)
      }, config.jwtSecret,
      {
        subject: `${userid}`,
        expiresIn: '24h'
      });
  
    callback(token);
    } else {
      callback(false);
    }
  })

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
