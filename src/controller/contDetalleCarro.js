const { servDetalleCarroIdCarrito } = require('../services/serviceDetalleCarro');

const contDetalleCarroId = async (req, res) => {
    var id = req.params.idCarrito;
    res.json(await servDetalleCarroIdCarrito(id));
}

module.exports = {
    contDetalleCarroId
}