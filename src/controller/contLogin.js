const { servGetUsuario, servCrearUsuario } = require('../services/serviceUsuario');
const { servCrearCarrito } = require('../services/serviceCarrito');
const { contUltimoCarritoUsuario } = require('../controller/contCarrito');
const { contPedidoPorIdCarrito } = require('../controller/contPedido');

var datos = {
    mensajeError: "",
    mensajeExito: "",
    estado: 0 //0 no logeado, 1 logeado
}

var user = {
    name: "Invitado",
    estado: false
}

var carrito = {
    idCarrito:null
}

const inicio = async (req, res) => {
    if (req.session.loggedin) {
        actualizarUser(req.session.username, true);
    } else {
        if (carrito.idCarrito == null){
            var result = await servCrearUsuario("", "", "", "", "", "", "", 1);
            var idUsuarioTemporal = result.insertId;
            actualizarDatosSesion(req.session, false, idUsuarioTemporal,"", "", "", "", "", "", "", 1);
            var idCarrito = await crearCarritoCliente(idUsuarioTemporal);
            //actualizamos objeto carrito para no realizar esta operacion nuevamente
            carrito.idCarrito = idCarrito;
            req.session.idCarrito = idCarrito;
        }
        actualizarUser("Invitado", false);
        req.session.username = "";
    }
    res.render('../views/index.ejs', { user: user });
}

const login = async (req, res) => {
    if (!req.session.loggedin) {
        actualizarUser("Invitado", false);
        actualizarDatos("","",0);
    }
    res.render('../views/login.ejs', { datos: datos });
}

const logout = async (req, res) => {
    if (req.session.loggedin) {
        actualizarDatos("", "Sesión cerrada correctamente", 0);
        actualizarUser("Invitado", false);
        actualizarDatosSesion(req.session, false, null,"", "", "", "", "", "", "", 0);
        carrito.idCarrito = null;
    } 
    res.render('../views/login.ejs', { datos: datos });
}


const autenticar = async (req, res) => {
    var datosUsuario = await servGetUsuario(req.body.inputNombreUsuario, req.body.inputPass);

    if (datosUsuario.length == 0) {
        actualizarDatos("Usuario o contraseña inválida", "", 0);
        res.render('../views/login.ejs', { datos: datos });
    } else {
        actualizarDatos("", "Logeado correctamente", 1);

        var tipoUsuario = datosUsuario[0].fk_idRol;
        actualizarDatosSesion(req.session, true, datosUsuario[0].idUsuario,datosUsuario[0].nombreUsuario,
            datosUsuario[0].nombre, datosUsuario[0].apellido, datosUsuario[0].direccion, datosUsuario[0].mail,
            tipoUsuario);
        actualizarUser(req.session.username, true);

        if (tipoUsuario == 1) {
            var idCarrito = await crearCarritoCliente(req.session.idUsuario);
            req.session.idCarrito = idCarrito;
            res.render('../views/index.ejs', { user: user });
        } else if (tipoUsuario == 2) {
            res.render('../views/vistaVendedor.ejs', { user: user });
        } else if (tipoUsuario == 3) {
            res.render('../views/vistaBodeguero.ejs', { user: user });
        } else if (tipoUsuario == 4) {
            actualizarDatos("Área de contaduría debe ingresar por sistema independiente", "", 0);
            res.render('../views/login.ejs', { datos: datos });
        } else if (tipoUsuario == 5) {
            res.render('../views/vistaAdministrador.ejs', { user: user });
        }
    }
}

const vendedor = async (req, res) => {
    if (!req.session.loggedin) {
        actualizarUser("Invitado", false);
        actualizarDatos("","",0);
        res.render('../views/login.ejs', { datos: datos });
    } else {
        res.render('../views/vistaVendedor.ejs', { user: user });
    }
}

const vendedorPedidos = async (req, res) => {
    if (!req.session.loggedin) {
        actualizarUser("Invitado", false);
        actualizarDatos("","",0);
        res.render('../views/login.ejs', { datos: datos });
    } else {
        res.render('../views/vistaVendedorPedidos.ejs', { user: user });
    }
}

const bodeguero = async (req, res) => {
    if (!req.session.loggedin) {
        actualizarUser("Invitado", false);
        actualizarDatos("","",0);
        res.render('../views/login.ejs', { datos: datos });
    } else {
        res.render('../views/vistaBodeguero.ejs', { user: user });
    }
}

const administrador = async (req, res) => {
    if (!req.session.loggedin) {
        actualizarUser("Invitado", false);
        actualizarDatos("","",0);
        res.render('../views/login.ejs', { datos: datos });
    } else {
        res.render('../views/vistaAdministrador.ejs', { user: user });
    }
}

const crearCarritoCliente = async (idUsuario) => {
    var estadoCarrito = await validarEstadoCarrito(idUsuario);

    if (estadoCarrito.idCarrito == null){
        var fecha = new Date();
        var mes = fecha.getMonth() + 1;
        var anio = fecha.getFullYear();
        var dia = fecha.toDateString().split(" ")[2];
        var total = 0;
        var f = anio+"-"+mes+"-"+dia;
        var resultadoCarrito = await servCrearCarrito(f, total, idUsuario);
        return resultadoCarrito.insertId;
    } else {
        return estadoCarrito.idCarrito;
    } 
}

/* const validarEstadoCarrito = async (idUsuario) => {} */

async function validarEstadoCarrito(idUsuario) {
    var result = await contUltimoCarritoUsuario(idUsuario);
    var idUltimoCarrito = result[0].MaxId;
    if (idUltimoCarrito == null){
        return {idCarrito: null};
    } else {
        var idPedido = await contPedidoPorIdCarrito(idUltimoCarrito);
        if (idPedido.length == 0){
            return {idCarrito:idUltimoCarrito};
        } else {
            return {idCarrito: null};
        }
    }
}

function actualizarDatos(merror, mexito, estado){
    datos.mensajeError = merror;
    datos.mensajeExito = mexito;
    datos.estado = estado;
}

function actualizarUser(nombre, estado){
    user.name = nombre;
    user.estado = estado;
}

function actualizarDatosSesion(sesion, estado, idUsuario, nombreUsuario, nombre, apellido, dir, mail, tipoUs) {
    sesion.loggedin = estado;
    sesion.username = nombreUsuario;
    sesion.nombre = nombre;
    sesion.apellido = apellido;
    sesion.direccion = dir;
    sesion.mail = mail;
    sesion.idUsuario = idUsuario;
    sesion.fk_idRol = tipoUs;
}

module.exports = {
    inicio,
    login,
    logout,
    autenticar,
    vendedor,
    bodeguero,
    administrador,
    vendedorPedidos
}