/**
 * Created by stefan.bley on 21.10.2016.
 */
var mysql = require('mysql')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'campus',
    password : 'campus',
    database : 'campus'
});

module.exports = connection;