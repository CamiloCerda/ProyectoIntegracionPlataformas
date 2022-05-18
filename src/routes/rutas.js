const login = require('../controller/contLogin');
const productos = require('../controller/contProductos');
const general = require('../controller/contGeneral');
const pedidos = require('../controller/contPedido');
const detalleCarro = require('../controller/contDetalleCarro');

const createRoutes = (app) => {
    //GENERALES
    app.get('/', login.inicio);
    app.get('/login', login.login);
    app.get('/logout', login.logout);
    app.post('/autenticar', login.autenticar);
    app.get('/carrito', general.carrito);
    app.get('/vendedor', login.vendedor);
    app.get('/vendedorPedidos', login.vendedorPedidos);
    app.get('/bodeguero', login.bodeguero);
    app.get('/administrador', login.administrador);
    app.get('/productos/:tipoProd', general.productos);

    //PRODUCTOS
    app.get('/todosProductos', productos.contGetProductos);
    app.get('/productosDescuentoTodos', productos.contGetTodosProductosDescuento);
    app.get('/productosDescuento', productos.contGetProductosDescuento);
    app.get('/productosRecientes', productos.contGetProductosReciente);
    app.get('/productoPorId/:idProducto', productos.contProductoPorId);

    //CARRITO
    app.post('/aniadirAlCarrito', general.aniadirAlCarrito);
    app.delete('/eliminarDetalleCarro', general.eliminarDetalleCarro);
    app.put('/disminuirCantidad', general.disminuirCantidad);
    app.put('/aumentarCantidad', general.aumentarCantidad);

    //PEDIDO
    app.post('/crearPedido', general.crearPedido);
    app.get('/todosPedidos', pedidos.contGetPedidos);
    app.get('/pedidosBodega', pedidos.contPedidosBodega);
    app.put('/actualizarPedido', pedidos.contActualizarPedido);
    app.get('/informePedidos/:anio/:mes/:tipoVentas/:localVentas', pedidos.contInformePedidos);

    //DETALLE CARRO
    app.get('/detalleCarrito/:idCarrito', detalleCarro.contDetalleCarroId);
}

module.exports = createRoutes;