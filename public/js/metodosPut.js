function disminuirCantidadProductoCarrito(idCarrito, idProducto){
    var datos = {
        idProducto: idProducto,
        idCarrito: idCarrito
    };
    var resultado = false;
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/disminuirCantidad",
        type: 'put',
        async: false,
        data: JSON.stringify(datos),
        success: function (data) {
            resultado = true;
            /* if(data.affectedRows == 1){
                resultado = true;
            } */
        },
        error: function (e) {
            console.log(e);
        }
    });
    return resultado;
}

function aumentarCantidadProductoCarrito(idCarrito, idProducto){
    var datos = {
        idProducto: idProducto,
        idCarrito: idCarrito
    };
    var resultado = false;
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/aumentarCantidad",
        type: 'put',
        async: false,
        data: JSON.stringify(datos),
        success: function (data) {
            resultado = true;
            /* if(data.affectedRows == 1){
                resultado = true;
            } */
        },
        error: function (e) {
            console.log(e);
        }
    });
    return resultado;
}


function actualizarPedido(idPedido, eo, ed){
    var datos = {
        idPedido: idPedido,
        eo: eo,
        ed:ed
    };
    var resultado = false;
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/actualizarPedido",
        type: 'put',
        async: false,
        data: JSON.stringify(datos),
        success: function (data) {
            resultado = true;
            /* if(data.affectedRows == 1){
                resultado = true;
            } */
        },
        error: function (e) {
            console.log(e);
        }
    });
    return resultado;
}