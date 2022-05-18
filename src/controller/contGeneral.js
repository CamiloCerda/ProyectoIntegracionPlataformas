const { servCrearDetalleCarro,
    servDetalleCarroIdCarrito,
    servEliminarDetalle,
    servDisminuirCantidad,
    servAumentarCantidad } = require('../services/serviceDetalleCarro');

const { servProductoPorId } = require('../services/serviceProductos');

const { servCrearPedido } = require('../services/servicePedido');

var user = {
    name: "Invitado",
    estado: false
}

//-------------------------CONTROLADORES-------------------------
const carrito = async (req, res) => {
    if (req.session.loggedin) {
        user.name = req.session.username;
        user.estado = true;
    } else {
        user.name = "Invitado";
        user.estado = false;
    }
    var detalleCarro = await servDetalleCarroIdCarrito(req.session.idCarrito);
    var info = await verDetalleProducto(detalleCarro, req.session.idCarrito);
    var productosRender = info[0];
    var totalGral = await formatoMoneda("" + info[1]);
    res.render('../views/carrito.ejs', { user: user, productosRender: productosRender, total: totalGral });
}

const productos = async (req, res) => {
    if (req.session.loggedin) {
        user.name = req.session.username;
        user.estado = true;
    } else {
        user.name = "Invitado";
        user.estado = false;
    }
    var tipoProd = req.params.tipoProd;
    res.render('../views/productos.ejs', { user: user, tipoProd:tipoProd});
}

const aniadirAlCarrito = async (req, res) => {
    var datos = req.body;
    res.json(await servCrearDetalleCarro(datos.cantidad, req.session.idCarrito, datos.idProducto));
}

const eliminarDetalleCarro = async (req, res) => {
    var idCarrito = req.body.idCarrito;
    var idProducto = req.body.idProducto;
    var resultado = await servEliminarDetalle(idCarrito, idProducto);
    res.json(resultado);
}

const disminuirCantidad = async (req, res) => {
    var idCarrito = req.body.idCarrito;
    var idProducto = req.body.idProducto;
    var resultado = await servDisminuirCantidad(idCarrito, idProducto);
    res.json(resultado);
}

const aumentarCantidad = async (req, res) => {
    var idCarrito = req.body.idCarrito;
    var idProducto = req.body.idProducto;
    var resultado = await servAumentarCantidad(idCarrito, idProducto);
    res.json(resultado);
}

const crearPedido = async (req, res) => {
    var datos = req.body;
    var empDespacho = datos.empresaDespacho;
    var localRetiro = datos.localRetiro;
    var formaEntrega = datos.formaEntrega;
    var formaPago = datos.formaPago;
    var total = datos.total;
    var estadoPedido = 1;
    var idCarrito = req.session.idCarrito;
    res.json(await servCrearPedido(empDespacho, localRetiro, formaEntrega, formaPago, total, estadoPedido, idCarrito));
}


//-------------------------FUNCIONES-------------------------
const verDetalleProducto = async (productos, idCarrito) => {
    var productosRender = [];
    var totalGral = 0;
    for (let producto of productos) {
        var productoDetalle = await servProductoPorId(producto.fk_idProducto);
        var totalProducto = 0;
        if (productoDetalle[0].descuento == 0) {
            totalProducto = productoDetalle[0].precio;
        } else {
            totalProducto = productoDetalle[0].precio - Math.round(productoDetalle[0].precio * productoDetalle[0].descuento / 100);
        }
        totalProducto = totalProducto * producto.cantidad;
        totalGral += totalProducto;
        var precioProd = await formatoMoneda("" + productoDetalle[0].precio);
        var totalProd = await formatoMoneda("" + totalProducto);
        var prod = {
            nombre: productoDetalle[0].nombreProd,
            precio: precioProd,
            dcto: productoDetalle[0].descuento,
            cantidad: producto.cantidad,
            idProducto: producto.fk_idProducto,
            idCarrito: idCarrito,
            totalProducto: totalProd
        };
        productosRender.push(prod);
    }
    return [productosRender, totalGral];

}

async function formatoMoneda(numero) {
    var aux = "";
    var form = "";
    for (let i = numero.length - 1; i >= 0; i--) {
        aux = aux + numero[i];
    }
    var c = 0;
    for (let i = 0; i < aux.length; i++) {
        form = form + aux[i];
        if (c == 2) {
            form = form + ".";
            c = -1;
        }
        c += 1;
    }
    if (form[form.length - 1] == '.') { form = form.substring(0, form.length - 1) }
    aux = "";
    for (let i = form.length - 1; i >= 0; i--) {
        aux = aux + form[i];
    }
    return aux;
}



module.exports = {
    carrito,
    aniadirAlCarrito,
    eliminarDetalleCarro,
    disminuirCantidad,
    aumentarCantidad,
    crearPedido,
    productos
}