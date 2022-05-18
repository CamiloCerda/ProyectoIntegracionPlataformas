function eliminarProductoCarrito(idCarrito, idProducto){
    var datos = {
        idProducto: idProducto,
        idCarrito: idCarrito
    };
    var resultado = false;
    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/eliminarDetalleCarro",
        type: 'delete',
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