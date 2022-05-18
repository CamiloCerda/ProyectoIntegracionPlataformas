const { servGetIdUsuarioPorUserName } = require('../services/serviceUsuario');

const contGetIdUsuarioPorUserName = async (nombre) => {
    var idUsuario = await servGetIdUsuarioPorUserName(nombre);
    idUsuario = idUsuario[0].idUsuario;
    return idUsuario;
}

module.exports = {
    contGetIdUsuarioPorUserName
} 