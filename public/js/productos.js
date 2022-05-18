const tipoProd = $("#tipoProds");
const cajaProductos = $("#productos");

$(document).ready(function () {
    var productos;
    if (tipoProd.val() == "todosProductos") {
        productos = getProductos();
    } else if (tipoProd.val() == "todasOfertas") {
        productos = getTodosProductosDcto();
    }
    productos.forEach(producto => {
        console.log(producto);
        var url = 'data:image/jpeg;base64,' + base64encode(producto.imgProducto.data); 
        cajaProductos.append('<div class="card me-2 mb-2" style="width: 23%;">'+
            '<img src ='+url+' class= "card-img-top" style="max-width: 200px; max-height: 200px" alt = "..." >'+
            '<div class="card-body d-flex flex-column justify-content-between">'+
                '<h5 class="card-title">'+producto.nombreProd+'</h5>'+
                '<h6 class="card-title">Marca: '+producto.nombre_marca+'</h6>'+
                '<h6 class="card-title">Categoría: '+producto.nombre_categoria+'</h6>'+
                '<h6 class="card-title">Precio: $'+formatoMoneda(""+producto.precio)+' CLP</h6>'+
                '<h6 class="card-title">Descuento: '+producto.descuento+'%</h6>'+
                '<h6 class="card-title">Stock: '+producto.stock+'</h6>'+
                '<i class="fa-solid fa-cart-plus" style="cursor: pointer;" onclick="aniadir(' + producto.idProducto +')"></i>'+
            '</div>'+
      '</div > ');
    });
});

function aniadir(id){
    var resultado = aniadirAlCarrito(id);
    if (resultado) {
      alert("¡Producto añadido al carrito de compras!");
    } else {
      alert("Error, no se ha podido añadir el producto correctamente")
    }
}
 
