var database = require('./database.js');

exports.getPasswordHash = async function(username) {
    var hash = await database.executeQuery("SELECT password FROM user WHERE username = ?", [username]);
    if(hash.length == 1) {
        return hash[0].password;
    } else {
        return false;
    }
}

exports.getId = async function(username) {
    var id = await database.executeQuery("SELECT userid FROM user WHERE username = ?", [username]);
    return id[0].userid;
}

exports.createAccount = async function(username, password) {
    let userid = await database.executeQuery('SELECT MAX(userid) AS id FROM user', []);
    userid = userid[0].id;
    if(userid == null) {
        userid = 1;
    } else {
        userid += 1;
    }
    var response = await database.executeQuery("INSERT INTO user(userid, username, password) VALUES(?, ?, ?)", [userid, username, password]);
    if(response && response.affectedRows == 1) {
        return userid;
    } else {
        return false;
    }
}

exports.insertToken = async function(userid, sessionToken, expiration) {
    var response = await database.executeQuery("UPDATE user SET session = ?, expiration = ? WHERE userid = ?", [sessionToken, expiration, userid]);
    if(response && response.affectedRows == 1) {
        return true;
    } else {
        return false;
    }
}

exports.getUserByToken = async function(token) {
    let response = await database.executeQuery("SELECT userid, username, expiration FROM user WHERE session = ?", [token]);
    return response[0];
}