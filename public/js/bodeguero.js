const modalDetalleCarrito = $("#modalDetalleCarrito");

$(document).ready(function () {
    //---------------CONSTANTES-----------------------------
    const bodyTablaPedidos = $("#bodyTablaPedidos");

    //---------------LLENAR TABLA PRODUCTOS-----------------
    var pedidos = getPedidosBodega();
    var i = 0;
    pedidos.forEach(pedido => {
        console.log(pedido);
        var color = 'class="table-secondary"';
        if (i % 2 == 1) {
            color = 'class="table-secondary"';
        } else {
            color = 'class="table-primary"';
        }
        i += 1;
        var local = pedido.localRetiro;
        if (local == null) { local = 'No aplica' }
        var despacho = pedido.empresaDespacho;
        if (despacho == null) { despacho = 'No aplica' }

        var fila = '<tr ' + color + '>' +
            '<th scope="row">' + pedido.idPedido + '</th>' +
            '<td>' + pedido.formaEntrega + '</td>' +
            '<td>' + local + '</td>' +
            '<td>' + despacho + '</td>' +
            '<td>' + pedido.formaPago + '</td>' +
            '<td>$' + formatoMoneda(""+pedido.total) + '</td>' +
            '<td>' + pedido.estado + '</td>'+
            "<td><button type='button' class='btn btn-dark text-nowrap' onclick='pintarModal("+pedido.fk_idCarrito+")' data-bs-toggle='modal' data-bs-target='#exampleModal' title='Ver detalle'><i class='fa-solid fa-share'></i></button>";

            if (pedido.idEstado == 4) {
                fila = fila + "<td><button type='button' class='btn btn-dark text-nowrap me-3' onclick='modificarPedido(" + pedido.idPedido + ",4,5)' id='eab" + pedido.idPedido + "'>Recepcionar en bodega</button></td></tr>";
            } else if (pedido.idEstado == 5) {
                fila = fila + "<td><button type='button' class='btn btn-dark text-nowrap me-3' onclick='modificarPedido(" + pedido.idPedido + ",5,6)' id='eab" + pedido.idPedido + "'>Despachar a vendedor</button></td></tr>";
            } else if (pedido.idEstado == 6) {
                fila = fila + '<td></td></tr>';
            }

        bodyTablaPedidos.append(fila);

    });
});


function pintarModal(id) {
    modalDetalleCarrito.empty();
    var detalleCarro = getDetalleCarro(id);
    detalleCarro.forEach(detalle => {
        var idProducto = detalle.fk_idProducto;
        var cantidad = detalle.cantidad;
        var detalle = getProductoPorId(idProducto);
        var nombre = detalle[0].nombreProd;
        var url = 'data:image/jpeg;base64,' + base64encode(detalle[0].imgProducto.data);
        var fila = '<div class="row">'+
                    '<div class="col-4">'+
                        '<img src="'+url+'" class="imgModal" id="imgModal" alt="">'+
                    '</div>'+
                    '<div class="col-8">'+
                        '<div class="mb-3">'+
                            '<label for="modalNombre" class="form-label">Nombre producto</label>'+
                            '<input type="text" class="form-control" id="modalNombre" value="'+nombre+'" disabled>'+
                        '</div>'+
                        '<div class="mb-3">'+
                            '<label for="modalCantidad" class="form-label">Cantidad</label>'+
                            '<input type="text" class="form-control" id="modalCantidad" value="'+cantidad+'" disabled>'+
                        '</div>'+
                    '</div>'+
                '</div>';
        modalDetalleCarrito.append(fila);
    });
}

