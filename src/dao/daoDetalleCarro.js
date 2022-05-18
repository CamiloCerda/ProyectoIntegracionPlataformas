const { conectar } = require('./conector');

const daoCrearDetalleCarro = (cantidad, fk_idCarrito, fk_idProducto) => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "insert into detalle_carro (cantidad, fk_idCarrito, fk_idProducto) values (?,?,?)";
        var datos = [cantidad, fk_idCarrito, fk_idProducto];
        connection.query(sql_query, datos, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoDetalleCarroIdCarrito = (idCarrito) => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "select cantidad, fk_idProducto from detalle_carro where fk_idCarrito = ?";
        var datos = [idCarrito];
        connection.query(sql_query, datos, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoEliminarDetalle = (idCarrito, idProducto) => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "delete from detalle_carro where fk_idCarrito = ? and fk_idProducto = ?";
        var datos = [idCarrito, idProducto];
        connection.query(sql_query, datos, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoDisminuirCantidad = (idCarrito, idProducto) => {
    return new Promise((resolve, reject) => {
        var connection = conectar(); 
        var sql_query = "update detalle_carro set cantidad = cantidad - 1 where fk_idCarrito = ? and fk_idProducto = ?";
        var datos = [idCarrito, idProducto];
        connection.query(sql_query, datos, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoAumentarCantidad = (idCarrito, idProducto) => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "update detalle_carro set cantidad = cantidad + 1 where fk_idCarrito = ? and fk_idProducto = ?";
        var datos = [idCarrito, idProducto];
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
    daoCrearDetalleCarro,
    daoDetalleCarroIdCarrito,
    daoEliminarDetalle,
    daoDisminuirCantidad,
    daoAumentarCantidad
}