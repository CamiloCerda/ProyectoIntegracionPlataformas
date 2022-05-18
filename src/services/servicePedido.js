const { daoPedidoPorIdCarrito,
        daoCrearPedido,
        daoTodosPedidos,
        daoActualizarPedido,
        daoPedidosBodega,
        daoInformePedidos } = require('../dao/daoPedido');

const servPedidoPorIdCarrito = async (idCarrito) => {
    return await daoPedidoPorIdCarrito(idCarrito);
}

const servCrearPedido = async (empresaDespacho, localRetiro, formaEntrega, formaPago, total, estadoPedido, fk_idCarrito) => {
    return await daoCrearPedido(empresaDespacho, localRetiro, formaEntrega, formaPago, total, estadoPedido, fk_idCarrito);
}

const servTodosPedidos= async () => {
    return await daoTodosPedidos();
}

const servPedidosBodega= async () => {
    return await daoPedidosBodega();
}

const servActualizarPedido = async (idPedido, ed) => {
    return await daoActualizarPedido(idPedido, ed);
}

const servInformePedidos= async (anio, mes, tipoVentas, localVentas) => {
    return await daoInformePedidos(anio, mes, tipoVentas, localVentas);
}

module.exports = {
    servPedidoPorIdCarrito,
    servCrearPedido,
    servTodosPedidos,
    servActualizarPedido,
    servPedidosBodega,
    servInformePedidos
}