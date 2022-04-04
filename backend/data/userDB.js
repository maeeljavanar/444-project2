var database = require('./database.js');


exports.getPasswordHash = async function(username) {
    var hash = await database.executeQuery("SELECT password FROM player WHERE username = ?", [username]);
    if(hash.length == 1) {
        return hash[0].password;
    } else {
        return false;
    }
}

exports.getId = async function(username) {
    var id = await database.executeQuery("SELECT userid FROM player WHERE username = ?", [username]);
    return id[0].userid;
}

exports.createAccount = async function(username, password) {
    let userid = await database.executeQuery('SELECT MAX(userid) AS id FROM player', []);
    userid = userid[0].id;
    if(userid == null) {
        userid = 1;
    } else {
        userid += 1;
    }
    var response = await database.executeQuery("INSERT INTO player(userid, username, password) VALUES(?, ?, ?)", [userid, username, password]);
    if(response && response.affectedRows == 1) {
        return userid;
    } else {
        return false;
    }
}