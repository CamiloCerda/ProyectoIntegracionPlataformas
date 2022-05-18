function verProductos() {
    var productos = getProductos();
    return productos;
}

function verProductosDcto() {
    var productos = getProductosDcto();
    return productos;
}

function verProductosRecientes() {
    var productos = getProductosRecientes();
    return productos;
}

function formatoMoneda(numero){
    var aux = "";
    var form = "";
    for (let i = numero.length-1; i >= 0; i--){
        aux = aux + numero[i];
    }
    var c = 0;
    for (let i = 0; i < aux.length; i++){
        form = form + aux[i];
        if (c == 2){
            form = form + ".";
            c = -1;
        }
        c += 1;
    }
    if (form[form.length - 1] == '.'){form = form.substring(0,form.length - 1)}
    aux = "";
    for (let i = form.length - 1; i >= 0; i--){
        aux = aux + form[i];
    } 
    return aux;
}

function base64encode(data) {
    return btoa(data.map(v => String.fromCharCode(v)).join(""));
}


function modificarPedido(id, eo, ed) {
    var resultado = actualizarPedido(id, eo, ed);
    if (ed == 2){
        if (resultado) {
            alert('Pedido aprobado!');
            location.replace('/vendedorPedidos');
        } else {
            alert("Error al aprobar el pedido");
        }
    } else if (ed == 3) {
        if (resultado) {
            alert('Pedido rechazado!');
            location.replace('/vendedorPedidos');
        } else {
            alert("Error al rechazar el pedido");
        }
    } else if (ed == 4){
        if (resultado) {
            alert('Pedido enviado a bodega!');
            location.replace('/vendedorPedidos');
        } else {
            alert("Error al enviar el pedido a bodega");
        }
    } else if (ed == 5){
        if (resultado) {
            alert('Orden recepcionada/aceptada en bodega!');
            location.replace('/bodeguero');
        } else {
            alert("Error al recepcionar en bodega");
        }
    } else if (ed == 6){
        if (resultado) {
            alert('Orden despachada a vendedor!');
            location.replace('/bodeguero');
        } else {
            alert("Error al despachar a vendedor");
        }
    } else if (ed == 7){
        if (resultado) {
            alert('Pedido recibido desde bodega!');
            location.replace('/vendedorPedidos');
        } else {
            alert("Error al recibir el pedido desde bodega");
        }
    } else if (ed == 8){
        if (resultado) {
            alert('Pedido enviado al cliente!');
            location.replace('/vendedorPedidos');
        } else {
            alert("Error al enviar el pedido al cliente");
        }
    } else if (ed == 9){
        if (resultado) {
            alert('Pedido finalizado!');
            location.replace('/vendedorPedidos');
        } else {
            alert("Error al finalizar el pedido");
        }
    }   
}