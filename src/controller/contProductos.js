const { servGetProductos,
        servGetProductosDescuento,
        servGetProductosRecientes,
        servProductoPorId,
        servGetTodosProductosDescuento } = require('../services/serviceProductos');

const contProductoPorId = async (req, res) => {
    var id = req.params.idProducto;
    res.json(await servProductoPorId(id));
}

const contGetProductos = async (req, res) => {
    res.json(await servGetProductos());
}

const contGetProductosDescuento = async (req, res) => {
    res.json(await servGetProductosDescuento());
}

const contGetTodosProductosDescuento = async (req, res) => {
    res.json(await servGetTodosProductosDescuento());
}

const contGetProductosReciente = async (req, res) => {
    res.json(await servGetProductosRecientes());
}

module.exports = {
    contGetProductos,
    contGetProductosDescuento,
    contGetProductosReciente,
    contProductoPorId,
    contGetTodosProductosDescuento
} 