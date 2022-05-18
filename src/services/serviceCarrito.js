const { 
    daoCrearCarrito,
    daoUltimoCarritoUsuario } = require('../dao/daoCarrito');

const servCrearCarrito = async (fecha, total, fk_idUsuario) => {
    return await daoCrearCarrito(fecha, total, fk_idUsuario);
}

const servUltimoCarritoUsuario = async (idUsuario) => {
    return await daoUltimoCarritoUsuario(idUsuario);
}

module.exports = {
    servCrearCarrito,
    servUltimoCarritoUsuario
}