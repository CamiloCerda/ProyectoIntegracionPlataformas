const { 
    servCrearCarrito,
    servUltimoCarritoUsuario } = require('../services/serviceCarrito');

const contUltimoCarritoUsuario = async (idUsuario) => {
    var idCarrito = await servUltimoCarritoUsuario(idUsuario);
    //idUsuario = idUsuario[0].idUsuario;
    return idCarrito;
}

module.exports = {
    contUltimoCarritoUsuario
} 