const { daoTodosProductos,
        daoProductosDescuentos,
        daoProductosRecientes,
        daoProductoPorId,
        daoTodosProductosDescuentos } = require('../dao/daoProductos');

const servGetProductos = async () => {
    return await daoTodosProductos();
}

const servGetTodosProductosDescuento = async () => {
    return await daoTodosProductosDescuentos();
}

const servGetProductosDescuento = async () => {
    return await daoProductosDescuentos();
}

const servGetProductosRecientes = async () => {
    return await daoProductosRecientes();
}

const servProductoPorId = async (idProducto) => {
    return await daoProductoPorId(idProducto);
}

module.exports = {
    servGetProductos,
    servGetProductosDescuento,
    servGetProductosRecientes,
    servProductoPorId,
    servGetTodosProductosDescuento
}