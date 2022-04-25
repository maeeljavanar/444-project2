var userdb = require('../data/userDB.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const tokenLength = 20;

async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(storedHash, password, username, callback) {
    if (await bcrypt.compare(password, storedHash)) {
        let userid = await userdb.getId(username);
        callback(userid);
    } else {
        callback();
    }
}

async function createToken() {
    var token           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < tokenLength; i++ ) {
      token += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return token;
}

exports.login = function(username, password, callback) {
    if(username && password) {
        userdb.getPasswordHash(username).then(storedHash => {
            if(storedHash) {
                verifyPassword(storedHash, password, username, callback)
            } else {
                callback(false);
            } 
        });
    } else {
        callback(false);
    }
} 

exports.createAccount = async function(username, password, callback) {
    let storedHash = await hashPassword(password);
    let userid = await userdb.createAccount(username, storedHash);
    callback(userid);
}

exports.createSessionToken = async function(userid, callback) {
    let token = await createToken();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let expiration = tomorrow.toISOString().slice(0, 19).replace('T', ' ');
    let result = await userdb.insertToken(userid, token, expiration)
    callback(token);
}

exports.validateToken = async function(token) {
    let user = await userdb.getUserByToken(token);
    if(!user) {
        return false;
    }
    let now = new Date();
    let then = new Date(user.expiration);
    if(then > now) {
        return user;
    } else {
        return false;
    }
}