const config = require('../config.json');
var mysql = require('mysql2');

function connect() {
    let connection = mysql.createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbName
    });
    
    connection.connect(function(err) {
        if (err) {
            console.error('error: ' + err.message);
        }
    });

    return connection;
}

function close(connection) {
    connection.end(function(err) {
        if (err) {
            console.log('error:' + err.message);
        }
    });
}

exports.executeQuery = function(sql, vals) {
    return new Promise(resolve => {
        let connection = connect();

        connection.execute(sql, vals, (err, rows) => {
           if(err) {
               console.log("Error: ", JSON.stringify(err), err);
               resolve(false);
           }
    
            connection.unprepare(sql); //close cached statement
            close(connection); //close connection
            if(rows) {
                resolve(rows);
            }
        });
    });  
}
