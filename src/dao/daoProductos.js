const { conectar } = require('./conector');

const daoTodosProductos = () => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "select p.idProducto, p.nombreProd, p.stock, p.precio, p.descuento, p.fechaRegistro,"+
                        " p.imgProducto, m.nombre_marca, c.nombre_categoria from producto p join marca m on p.fk_idMarca = m.id_marca "+
                        "join categoria c on p.fk_idCategoria = c.id_categoria order by p.idProducto";
        connection.query(sql_query, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoProductosDescuentos = () => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "select * from producto where descuento > 0 order by descuento desc limit 5";
        connection.query(sql_query, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoTodosProductosDescuentos = () => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "select p.idProducto, p.nombreProd, p.stock, p.precio, p.descuento, p.fechaRegistro,"+
                        " p.imgProducto, m.nombre_marca, c.nombre_categoria from producto p join marca m on p.fk_idMarca = m.id_marca "+
                        "join categoria c on p.fk_idCategoria = c.id_categoria where p.descuento > 0 order by p.descuento desc";
        connection.query(sql_query, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoProductosRecientes = () => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "select * from producto order by fechaRegistro desc limit 5";
        connection.query(sql_query, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoProductoPorId = (idProducto) => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "select nombreProd, imgProducto, precio, descuento from producto where idProducto = ?";
        var datos = [idProducto];
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
    daoTodosProductos,
    daoProductosDescuentos,
    daoProductosRecientes,
    daoProductoPorId,
    daoTodosProductosDescuentos
}