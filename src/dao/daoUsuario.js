const { conectar } = require('./conector');

const daoGetUsuario = (nombreUsuario, pass) => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "select idUsuario, nombre, apellido, direccion, mail, nombreUsuario, fk_idRol from usuario where nombreUsuario = ? and pass = ?";
        var datos = [nombreUsuario, pass];
        connection.query(sql_query, datos, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoGetIdUsuarioPorUserName = (nombreUsuario) => {
    return new Promise((resolve, reject) => { 
        var connection = conectar();
        var sql_query = "select idUsuario from usuario where nombreUsuario = ?";
        var datos = [nombreUsuario];
        connection.query(sql_query, datos, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoCrearUsuario = (nombre, apellido, rut, direccion, mail, nombreUsuario, pass, fk_idRol) => {
    return new Promise((resolve, reject) => { 
        var connection = conectar();
        var sql_query = "insert into usuario (nombre, apellido, rut, direccion, mail, nombreUsuario, pass, fk_idRol) "
        + " values (?, ?, ?, ?, ?, ?, ?, ?)";
        var datos = [nombre, apellido, rut, direccion, mail, nombreUsuario, pass, fk_idRol];
        connection.query(sql_query, datos, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    daoGetUsuario,
    daoGetIdUsuarioPorUserName,
    daoCrearUsuario
}