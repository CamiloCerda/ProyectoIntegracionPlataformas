const { daoCrearDetalleCarro,
        daoDetalleCarroIdCarrito,
        daoEliminarDetalle,
        daoDisminuirCantidad,
        daoAumentarCantidad } = require('../dao/daoDetalleCarro');

const servCrearDetalleCarro = async (cantidad, idCarrito, idProducto) => {
    return await daoCrearDetalleCarro(cantidad, idCarrito, idProducto);
}

const servDetalleCarroIdCarrito = async (idCarrito) => {
    return await daoDetalleCarroIdCarrito(idCarrito);
}

const servEliminarDetalle = async (idCarrito, idProducto) => {
    return await daoEliminarDetalle(idCarrito, idProducto);
}

const servDisminuirCantidad = async (idCarrito, idProducto) => {
    return await daoDisminuirCantidad(idCarrito, idProducto);
}

const servAumentarCantidad = async (idCarrito, idProducto) => {
    return await daoAumentarCantidad(idCarrito, idProducto);
}

module.exports = {
    servCrearDetalleCarro,
    servDetalleCarroIdCarrito,
    servEliminarDetalle,
    servDisminuirCantidad,
    servAumentarCantidad
}