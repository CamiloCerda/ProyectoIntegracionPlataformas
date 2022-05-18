function getProductos() {
    var productos = [];
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/todosProductos",
        type: 'GET',
        async: false,
        success: function (data) {
            productos = data;
        },
        error: function (e) {
            productos = e;
        }
    });
    return productos;
}

function getProductosDcto() {
    var productos = [];
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/productosDescuento",
        type: 'GET',
        async: false,
        success: function (data) {
            productos = data;
        },
        error: function (e) {
            productos = e;
        }
    });
    return productos;
}

function getProductosRecientes() {
    var productos = [];
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/productosRecientes",
        type: 'GET',
        async: false,
        success: function (data) {
            productos = data;
        },
        error: function (e) {
            productos = e;
        }
    });
    return productos;
}

function getTodosProductosDcto() {
    var productos = [];
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/productosDescuentoTodos",
        type: 'GET',
        async: false,
        success: function (data) {
            productos = data;
        },
        error: function (e) {
            productos = e;
        }
    });
    return productos;
}


function getPedidos() {
    var pedidos = [];
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/todosPedidos",
        type: 'GET',
        async: false,
        success: function (data) {
            pedidos = data;
        },
        error: function (e) {
            pedidos = e;
        }
    });
    return pedidos;
}

function getPedidosBodega() {
    var pedidos = [];
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/pedidosBodega",
        type: 'GET',
        async: false,
        success: function (data) {
            pedidos = data;
        },
        error: function (e) {
            pedidos = e;
        }
    });
    return pedidos;
}

function getDetalleCarro(idCarrito) {
    var detalle = [];
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/detalleCarrito/" + idCarrito,
        type: 'GET',
        async: false,
        success: function (data) {
            detalle = data;
        },
        error: function (e) {
            detalle = e;
        }
    });
    return detalle;
}


function getProductoPorId(idProducto) {
    var detalleProducto = [];
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/productoPorId/" + idProducto,
        type: 'GET',
        async: false,
        success: function (data) {
            detalleProducto = data;
        },
        error: function (e) {
            detalleProducto = e;
        }
    });
    return detalleProducto;
}

function getInformePedidos(anio, mes, tipoVentas, localVentas) {
    var informe = [];
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/informePedidos/" + anio + "/" + mes + "/" + tipoVentas + "/" + localVentas,
        type: 'GET',
        async: false,
        success: function (data) {
            informe = data;
        },
        error: function (e) {
            informe = e;
        }
    });
    return informe;
}
