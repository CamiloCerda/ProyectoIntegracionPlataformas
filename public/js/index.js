//CONSTANTES
const divProductosDcto = document.getElementById('productosDcto');
const divProductosRecientes = document.getElementById('productosRecientes');

//console.log(verProductos());
var productosDcto = verProductosDcto();
var productosRecientes = verProductosRecientes();

productosDcto.forEach(producto => {
  console.log(producto);
  //div card
  var cardDiv = document.createElement('div');
  cardDiv.className = "card border-success me-3 mb-3 cardProducto";
  cardDiv.style.width = "18%";
  //img
  var img = document.createElement("img");
  let imageURI = 'data:image/jpeg;base64,' + base64encode(producto.imgProducto.data);
  img.className = "card-img-top";
  img.src = imageURI;
  img.style.maxWidth = "300px";
  img.style.maxHeight = "200px";
  img.title = producto.descuento + "% dcto";
  //div card body
  var cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column justify-content-between";
  //titulo card body
  var titulo = document.createElement("a");
  titulo.href = "#";
  titulo.className = "card-title text-dark";
  titulo.textContent = producto.nombreProd;
  //acciones card body
  var divAcciones = document.createElement("div");
  divAcciones.style.width = "100%";
  divAcciones.className = "d-flex align-items-baseline";
  //add to cart
  var i = document.createElement("i");
  i.className = "fa-solid fa-cart-plus addToCart me-3";
  i.title = "Añadir al carrito";
  i.id = "addToCartPD" + producto.idProducto;
  //mas detalle producto
  var verDetalle = document.createElement("i");
  verDetalle.className = "fa-solid fa-circle-plus masDetalle";
  verDetalle.id = "verDetalle" + producto.idProducto;

  divAcciones.appendChild(i);
  //divAcciones.appendChild(verDetalle);
  cardBody.appendChild(titulo);
  cardBody.appendChild(divAcciones);
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);
  divProductosDcto.appendChild(cardDiv);

  i.addEventListener('click', () => {
    var idProducto = i.id.replace('addToCartPD', '');
    var resultado = aniadirAlCarrito(idProducto);
    if (resultado) {
      alert("¡Producto añadido al carrito de compras!");
    } else {
      alert("Error, no se ha podido añadir el producto correctamente")
    }
  });
});

productosRecientes.forEach(producto => {
  console.log(producto);
  //div card
  var cardDiv = document.createElement('div');
  cardDiv.className = "card border-success me-3 mb-3";
  cardDiv.style.width = "18%";
  //img
  var img = document.createElement("img");
  let imageURI = 'data:image/jpeg;base64,' + base64encode(producto.imgProducto.data);
  img.className = "card-img-top";
  img.src = imageURI;
  img.style.maxWidth = "300px";
  img.style.maxHeight = "200px";
  img.title = "Agregado el " + producto.fechaRegistro.substring(0, 10);
  //div card body
  var cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column justify-content-between";
  //titulo card body
  var titulo = document.createElement("a");
  titulo.href = "#";
  titulo.className = "card-title text-dark";
  titulo.textContent = producto.nombreProd;
  //acciones card body
  var divAcciones = document.createElement("div");
  divAcciones.style.width = "100%";
  divAcciones.className = "d-flex align-items-baseline";
  //add to cart
  var i = document.createElement("i");
  i.className = "fa-solid fa-cart-plus addToCart me-3";
  i.title = "Añadir al carrito";
  i.id = "addToCart" + producto.idProducto;
  //mas detalle producto
  var verDetalle = document.createElement("i");
  verDetalle.className = "fa-solid fa-circle-plus masDetalle";
  verDetalle.id = "verDetalle" + producto.idProducto;

  divAcciones.appendChild(i);
  //divAcciones.appendChild(verDetalle);
  cardBody.appendChild(titulo);
  cardBody.appendChild(divAcciones);
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);
  divProductosRecientes.appendChild(cardDiv);

  i.addEventListener('click', () => {
    var idProducto = i.id.replace('addToCart', '');
    var resultado = aniadirAlCarrito(idProducto);
    if (resultado) {
      alert("¡Producto añadido al carrito de compras!");
    } else {
      alert("Error, no se ha podido añadir el producto correctamente")
    }
  });
});


$(document).ready(function () {
  var btnMasOfertas = $("#btnMasOfertas");
  btnMasOfertas.click(e=>{
    e.preventDefault();
    location.replace('/productos/todasOfertas');
  });

  var btnProductosGral = $("#btnProductosGral");
  btnProductosGral.click(e=>{
    e.preventDefault();
    location.replace('/productos/todosProductos');
  });
});
