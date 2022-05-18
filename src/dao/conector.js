const config = require('../../config');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : config.HOST_DATA_BASE,
    user     : config.USER_DATA_BASE,
    password : config.PASSWORD_DATA_BASE,
    database : config.NAME_DATA_BASE
});


const conectar = () => {
    connection.connect(function(error){
        if(error){
            return error.message;
        }
    });
    return connection;
}

module.exports = {
    conectar,
}