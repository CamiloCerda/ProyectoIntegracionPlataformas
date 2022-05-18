const { daoGetUsuario,
        daoGetIdUsuarioPorUserName,
        daoCrearUsuario } = require('../dao/daoUsuario');

const servGetUsuario = async (nombreUsuario, pass) => {
    return await daoGetUsuario(nombreUsuario, pass);
}

const servGetIdUsuarioPorUserName = async (nombreUsuario) => {
    return await daoGetIdUsuarioPorUserName(nombreUsuario);
}

const servCrearUsuario = async (nombre, apellido, rut, direccion, mail, nombreUsuario, pass, fk_idRol) => {
    return await daoCrearUsuario(nombre, apellido, rut, direccion, mail, nombreUsuario, pass, fk_idRol);
}

module.exports = {
    servGetUsuario,
    servGetIdUsuarioPorUserName,
    servCrearUsuario
}