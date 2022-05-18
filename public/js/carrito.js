//------------------------CONSTANTES---------------------------------
const btnEliminar = document.getElementsByClassName('btnEliminar');
const btnDisminuir = document.getElementsByClassName('btnDisminuir');
const btnAumentar = document.getElementsByClassName('btnAumentar'); 
const btnModalPago = document.getElementById('btnModalPago'); 
const inputTotal = document.getElementById('inputTotal'); 
const totalGral = document.getElementById('totalGral');
const selectFormaPago = document.getElementById('formaPago');
const selectFormaEntrega = document.getElementById('formaEntrega');
const selectLocalRetiro = document.getElementById('localRetiro');
const selectEmpresaDespacho = document.getElementById('empresaDespacho'); 
const btnPagar = document.getElementById('btnPagar'); 
const btnDolar = document.getElementById('btnDolar'); 
const totalDolares = document.getElementById('totalDolares');
const filaDolar = document.getElementById('filaDolar');


//------------------------VARIABLES GLOBALES-------------------------
var btnsEliminar = [];
var btnsDisminuir = [];
var btnsAumentar = [];

//inicio
filaDolar.style.visibility = "hidden"; 

//------------------------ESCUCHAS-----------------------------------
btnModalPago.addEventListener('click', ()=>{
    inputTotal.value = totalGral.innerText;
});

selectFormaEntrega.addEventListener('change', ()=>{
    if (selectFormaEntrega.value == 0){
        selectLocalRetiro.disabled = false;
        selectEmpresaDespacho.disabled = true;
    } else {
        selectLocalRetiro.disabled = true;
        selectEmpresaDespacho.disabled = false;
    }
});

btnPagar.addEventListener('click', ()=>{
    var formaPagoSel = selectFormaPago.options[selectFormaPago.selectedIndex].text;
    var formaEntregaSel = selectFormaEntrega.options[selectFormaEntrega.selectedIndex].text;
    var localRetiroSel = selectLocalRetiro.options[selectLocalRetiro.selectedIndex].text;
    var empresaDespachoSel = selectEmpresaDespacho.options[selectEmpresaDespacho.selectedIndex].text;
    var total = inputTotal.value.replaceAll('.','');
    if (selectFormaEntrega.value == 0){
        empresaDespachoSel = null;
    } else {
        localRetiroSel = null;
    }
    var resultado = crearPedido(formaPagoSel, formaEntregaSel, localRetiroSel, empresaDespachoSel, total);
    if (resultado){
        alert('Pedido pagado correctamente!');
        location.replace('/');
    } else {
        alert('Error al pagar!');
    }
});

btnDolar.addEventListener('click', ()=>{
    var tipoMonedaOrigen = "CLP";
    var tipoMonedaDestino = "USD";
    var cantidadOrigen = totalGral.innerText.replaceAll('.','');
    fetch(`https://api.exchangerate-api.com/v4/latest/${tipoMonedaOrigen}`)
        .then(res => res.json())
        .then(data => {
            var taza = data.rates[tipoMonedaDestino];
            var cantidaDolares = parseFloat(cantidadOrigen) * taza;
            totalDolares.innerHTML = cantidaDolares.toFixed(2);
            filaDolar.style.visibility = "visible"; 
        });
});

for (let index = 0; index < btnEliminar.length; index++) {
    var btn = btnEliminar[index];
    var id = btn.id;
    btnsEliminar.push(document.getElementById("" + id + ""));
    btnsEliminar[index].addEventListener('click', (e) => {
        var id = btnsEliminar[index].id;
        var idCarrito = id.split('-')[0];
        var idProducto = id.split('-')[1];
        var resultado = eliminarProductoCarrito(idCarrito, idProducto);
    });
}

for (let index = 0; index < btnDisminuir.length; index++) {
    var btn = btnDisminuir[index];
    var id = btn.id;
    btnsDisminuir.push(document.getElementById("" + id + ""));
    btnsDisminuir[index].addEventListener('click', (e) => {
        e.preventDefault();
        var id = btnsDisminuir[index].id.replace('menos', '');
        var idCarrito = id.split('-')[0];
        var idProducto = id.split('-')[1];
        var resultado = disminuirCantidadProductoCarrito(idCarrito, idProducto);
        if (resultado) {
            location.replace('/carrito');
        } else {
            alert('Error al disminuir cantidad de producto');
        }
    });
}

for (let index = 0; index < btnAumentar.length; index++) {
    var btn = btnAumentar[index];
    var id = btn.id;
    btnsAumentar.push(document.getElementById("" + id + ""));
    btnsAumentar[index].addEventListener('click', (e) => {
        e.preventDefault();
        var id = btnsAumentar[index].id.replace('mas', '');
        var idCarrito = id.split('-')[0];
        var idProducto = id.split('-')[1];
        var resultado = aumentarCantidadProductoCarrito(idCarrito, idProducto);
        if (resultado) {
            location.replace('/carrito');
        } else {
            alert('Error al aumentar cantidad de producto');
        } 
    });
}