const { conectar } = require('./conector');

const daoCrearCarrito = (fecha, total, fk_idUsuario) => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "insert into carrito (fecha, total, fk_idUsuario) values (?,?,?)";
        var datos = [fecha, total, fk_idUsuario];
        connection.query(sql_query, datos, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoUltimoCarritoUsuario = (idUsuario) => {
    return new Promise( (resolve, reject) => {
        var connection = conectar();
        var sql_query = "select max(idCarrito) MaxId from carrito where fk_idUsuario = ?";
        var datos = [idUsuario];
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
    daoCrearCarrito,
    daoUltimoCarritoUsuario
}