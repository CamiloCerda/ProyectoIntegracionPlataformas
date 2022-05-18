const { conectar } = require('./conector');

const daoPedidoPorIdCarrito = (idCarrito) => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "select idPedido from pedido where fk_idCarrito = ?";
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

const daoCrearPedido = (empresaDespacho, localRetiro, formaEntrega, formaPago, total, estadoPedido, fk_idCarrito) => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "insert into pedido (empresaDespacho, localRetiro, formaEntrega, formaPago, total, estadoPedido, fk_idCarrito, pedidoEntregado, trasnfRealizada)" + 
        " values (?,?,?,?,?,?,?,?,?)";
        var datos = [empresaDespacho, localRetiro, formaEntrega, formaPago, total, estadoPedido, fk_idCarrito,0,0];
        connection.query(sql_query, datos, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoTodosPedidos = () => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "select * from pedido p join estado_orden eo on p.estadoPedido = eo.idEstado order by p.idPedido";
        //var datos = [idCarrito];
        connection.query(sql_query, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoPedidosBodega = () => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "select * from pedido p join estado_orden eo on p.estadoPedido = eo.idEstado where p.estadoPedido in (4,5,6) order by p.idPedido";
        connection.query(sql_query, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoActualizarPedido = (idPedido, ed) => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query = "update pedido set estadoPedido = ? where idPedido = ?";
        var datos = [ed, idPedido];
        connection.query(sql_query, datos, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
}

const daoInformePedidos = (anio, mes, tipoVentas, localVentas) => {
    return new Promise((resolve, reject) => {
        var connection = conectar();
        var sql_query;
        var datos;
        var tipoVentasQuery = "";
        var localVentasQuery = "";
        var condicionAdicional = "";
        //tipo ventas
        if (tipoVentas == 0){
            tipoVentasQuery = "('Despacho a domicilio', 'Retiro en local')";
            condicionAdicional = " or p.localRetiro is null";
        } else if (tipoVentas == 1) {
            tipoVentasQuery = "('Retiro en local')";
        } else {
            tipoVentasQuery = "('Despacho a domicilio')";
            condicionAdicional = " or p.localRetiro is null";
        }
        //localVentas
        if (localVentas == 0){
            localVentasQuery = "('Local Alameda', 'Local Vitacura', 'Local Apumanque')";
        } else if (localVentas == 1) {
            localVentasQuery = "('Local Alameda')";
        } else if (localVentas == 2) {
            localVentasQuery = "('Local Vitacura')";
        } else {
            localVentasQuery = "('Local Apumanque')";
        }
        localVentasQuery = localVentasQuery + condicionAdicional;

        if (mes == 0){
            sql_query = "SELECT SUM(p.total) Total FROM pedido p WHERE (SELECT extract(year from fecha) FROM carrito where idCarrito = p.fk_idCarrito) = ? "+
            "and p.formaEntrega in "+tipoVentasQuery + " and (p.localRetiro in "+localVentasQuery + ")";
            datos = [anio];
        } else {
            sql_query = "SELECT SUM(p.total) Total FROM pedido p WHERE (SELECT extract(year from fecha) FROM carrito where idCarrito = p.fk_idCarrito) = ? "+
            "and (SELECT extract(month from fecha) FROM carrito where idCarrito = p.fk_idCarrito) = ? "+
            "and p.formaEntrega in "+tipoVentasQuery + " and (p.localRetiro in "+localVentasQuery + ")";
            datos = [anio, mes];
        }
        //var datos = [anio]; 
        
        connection.query(sql_query, datos , function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    });
} 

module.exports = {
    daoPedidoPorIdCarrito,
    daoCrearPedido,
    daoTodosPedidos,
    daoActualizarPedido,
    daoPedidosBodega,
    daoInformePedidos
}

