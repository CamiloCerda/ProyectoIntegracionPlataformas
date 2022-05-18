//VARIABLES GLOBALES
const btnGenerarInformes = $("#btnGenerarInformes");
const selectAnio = $("#selectAnio");
const selectMes = $("#selectMes");
const selectTipoVentas = $("#selectTipoVentas");
const selectLocalVentas = $("#selectLocalVentas");

$(document).ready(function () {
});

btnGenerarInformes.click(()=>{
    var anio = selectAnio.val();
    var mes = selectMes.val();
    var tipoVentas = selectTipoVentas.val();
    var localVentas = selectLocalVentas.val();

    var textoMes = $("#selectMes option:selected").text();
    var textoTV = $("#selectTipoVentas option:selected").text();
    var textoLV = $("#selectLocalVentas option:selected").text();

    if (tipoVentas == 0){
        textoLV = "Todas";
        localVentas = 0;
    } else if (tipoVentas == 2){
        textoLV = "No aplica";
    }

    var informe = getInformePedidos(anio, mes, tipoVentas, localVentas);
    generarInforme(informe, anio, textoMes, textoTV, textoLV);
});

selectTipoVentas.change(()=>{
    if (selectTipoVentas.val() == 1){
        $("#selectLocalVentas").attr('disabled', false);
    } else {
        $("#selectLocalVentas").attr('disabled', true);
    }
});

function generarInforme(informe, anio, mes, tipoV, localV){
    //console.log(informe);
    var doc = new jsPDF();
    //variables usuario
    var nUsuario = $("#hNombreUsuario").text().trim();
    var fecha = obtenerFecha(new Date());

    //titulo
    doc.setFontSize(22);
    doc.setFontStyle('bold');
    doc.text('Informe de ventas', 70, 30);
    //department
    doc.setFontSize(10);
    doc.text('Fecha:  ' + fecha, 5, 50);
    doc.text('Usuario solicitante:  ' + nUsuario, 5, 60);
    doc.text('Cargo:  Administrador', 5, 70);

    let info = []
    informe.forEach((element, index, array) => {
        var total = element.Total;
        if(total == null){
            total = 0;
        }
        info.push([anio, mes, tipoV, localV, "$"+formatoMoneda(""+total)])
    })
    //console.log(info);
    doc.setFontSize(22);
    doc.text('Resultados', 5, 100);
    doc.autoTable({
        startY: 120,
        head: [["Año informe", "Mes informe", "Tipo de ventas", "Local ventas", "Ganancias"]],
        body: info
      });

    doc.save("InformeVentas.pdf");
}

function obtenerFecha(fecha){
    var anioActual = fecha.getFullYear();
    var hoy = fecha.getDate();
    var mesActual = fecha.getMonth() + 1; 
    var aux = hoy + "/" + mesActual + "/" + anioActual;
    return aux;
}
