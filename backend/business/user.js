var userdb = require('../data/userDB.js');
const argon2 = require('argon2');

async function hashPassword(password) {
    return await argon2.hash(password);
}

async function verifyPassword(storedHash, password, username, callback) {
    if (await argon2.verify(storedHash, password)) {
        let userid = await userdb.getId(username);
        callback(userid);
    } else {
        callback();
    }
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
