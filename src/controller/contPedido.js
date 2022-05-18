const { servPedidoPorIdCarrito,
        servTodosPedidos,
        servPedidosBodega,
        servActualizarPedido,
        servInformePedidos } = require('../services/servicePedido');

const contPedidoPorIdCarrito = async (idCarrito) => {
    var idPedido = await servPedidoPorIdCarrito(idCarrito);
    return idPedido;
}

const contGetPedidos = async (req, res) => {
    res.json(await servTodosPedidos());
}

const contPedidosBodega = async (req, res) => {
    res.json(await servPedidosBodega());
}

const contActualizarPedido = async (req, res) => {
    var datos = req.body;
    var idPedido = datos.idPedido;
    var eo = datos.eo;
    var ed = datos.ed;
    res.json(await servActualizarPedido(idPedido, ed));
}

const contInformePedidos = async (req, res) => {
    var anio = req.params.anio;
    var mes = req.params.mes;
    var tipoVentas = req.params.tipoVentas;
    var localVentas = req.params.localVentas;
    res.json(await servInformePedidos(anio, mes, tipoVentas, localVentas));
}

module.exports = {
    contPedidoPorIdCarrito,
    contGetPedidos,
    contActualizarPedido,
    contPedidosBodega,
    contInformePedidos
} 