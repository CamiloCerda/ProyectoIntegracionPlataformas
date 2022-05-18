$(document).ready(function () {
    //---------------CONSTANTES-----------------------------
    const bodyTablaPedidos = $("#bodyTablaPedidos");

    //---------------LLENAR TABLA PRODUCTOS-----------------
    var pedidos = getPedidos();
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
            '<td>' + pedido.estado + '</td>';

        if (pedido.idEstado == 1 || pedido.idEstado == 3) {
            fila = fila +
                "<td><button type='button' class='btn btn-dark text-nowrap me-3' onclick='modificarPedido(" + pedido.idPedido + ",1,2)' id='ap" + pedido.idPedido + "' title='Aceptar'>A</button><button type='button' class='btn btn-dark' onclick='modificarPedido(" + pedido.idPedido + ",1,3)' id='re" + pedido.idPedido + "' title='Rechazar'>R</button>" +
                '</tr>'
        } else if (pedido.idEstado == 2 ){
            fila = fila +
                "<td><button type='button' class='btn btn-dark text-nowrap me-3' onclick='modificarPedido(" + pedido.idPedido + ",2,4)' id='eab" + pedido.idPedido + "'>Enviar a bodega</button>" +
                '</tr>'
        } else if (pedido.idEstado == 4 || pedido.idEstado == 5) {
            fila = fila + '<td></td></tr>';
        } else if (pedido.idEstado == 6) {
            fila = fila + "<td><button type='button' class='btn btn-dark text-nowrap me-3' onclick='modificarPedido(" + pedido.idPedido + ",6,7)' id='eab" + pedido.idPedido + "'>Recibir desde bodega</button></td></tr>";
        } else if (pedido.idEstado == 7) {
            fila = fila + "<td><button type='button' class='btn btn-dark text-nowrap me-3' onclick='modificarPedido(" + pedido.idPedido + ",7,8)' id='eab" + pedido.idPedido + "'>Enviar a cliente</button></td></tr>";
        } else if (pedido.idEstado == 8) {
            fila = fila + "<td><button type='button' class='btn btn-dark text-nowrap me-3' onclick='modificarPedido(" + pedido.idPedido + ",8,9)' id='eab" + pedido.idPedido + "'>Finalizar pedido</button></td></tr>";
        } else if (pedido.idEstado == 9) {
            fila = fila + '<td></td></tr>';
        }

        bodyTablaPedidos.append(fila);

    });
});


