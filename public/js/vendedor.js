var listaProductos = [];
const modalPrecio = $("#modalPrecio");
const modalDcto = $("#modalDcto");
const modalStock = $("#modalStock");
const modalNombre = $("#modalNombre");
const modalCategoria = $("#modalCategoria");
const modalMarca = $("#modalMarca");
const modalFecha = $("#modalFecha");

$(document).ready(function () {
    //---------------CONSTANTES-----------------------------
    const bodyTablaProductos = $("#bodyTablaProductos");
    
    //---------------LLENAR TABLA PRODUCTOS-----------------
    var productos = getProductos();
    var i = 0;
    productos.forEach(producto => {
        listaProductos.push(producto);
        console.log(producto);
        var color = 'class="table-secondary"';
        if(i%2==1){
            color = 'class="table-secondary"';
        } else {
            color = 'class="table-primary"';
        }
        i += 1;
        bodyTablaProductos.append('<tr '+ color +'>' +
            '<th scope="row">'+producto.idProducto+'</th>' +
            '<td>'+producto.nombreProd+'</td>' +
            '<td>$'+formatoMoneda(""+producto.precio)+'</td>' +
            '<td>'+producto.stock+'</td>' +
            "<td><button type='button' class='btn btn-dark btnVerDetalle' onclick='pintarModal("+producto.idProducto+")' data-bs-toggle='modal' data-bs-target='#exampleModal' id='verDet" + producto.idProducto + "'>Ver detalle</button>"+
            '</tr>');
        
    });
});

function pintarModal(id) {
    listaProductos.forEach(prod => {
        if(prod.idProducto == id){
            console.log(prod.imgProducto);
            var url = 'data:image/jpeg;base64,' + base64encode(prod.imgProducto.data);
            $("#imgModal").attr('src', url);
            modalPrecio.val("$"+formatoMoneda(""+prod.precio));
            modalDcto.val(prod.descuento); 
            modalStock.val(prod.stock); 
            modalNombre.val(prod.nombreProd); 
            modalCategoria.val(prod.nombre_categoria);
            modalMarca.val(prod.nombre_marca); 
            modalFecha.val(prod.fechaRegistro.split('T')[0]); 
        }
    });
}
