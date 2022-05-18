function aniadirAlCarrito(idProducto){
    var datos = {
        idProducto: idProducto,
        cantidad: 1
    };
    var resultado = false;
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/aniadirAlCarrito",
        type: 'POST',
        async: false,
        data: JSON.stringify(datos),
        success: function (data) {
            if(data.affectedRows == 1){
                resultado = true;
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
    return resultado;
}


function crearPedido(formaPagoSel, formaEntregaSel, localRetiroSel, empresaDespachoSel, total){
    var datos = {
        empresaDespacho: empresaDespachoSel,
        localRetiro: localRetiroSel,
        formaEntrega:formaEntregaSel,
        formaPago:formaPagoSel,
        total:total
    };
    var resultado = false;
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/crearPedido",
        type: 'POST',
        async: false,
        data: JSON.stringify(datos),
        success: function (data) {
            if(data.affectedRows == 1){
                resultado = true;
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
    return resultado;
}

