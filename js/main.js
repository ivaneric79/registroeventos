// Traducción al español
/*$(function($){
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});
$(".fechaev").date();*/
var evento;


$(document).on("pagebeforeshow", '#registrolist', function(event) { 
listarregistros(evento);

    });

$(document).ready(function(){

$('.renviar').click(function(){

var str = $('#rtwitter').val();
$.ajax({
        type: "POST",
        data: {rnombre : $('#rnombre').val(),
rempresa : $('#rempresa').val(),
rtwitter : str.substring(1),
rtoficina : $('#rtoficina').val(),
rtmovil : $('#rtmovil').val(),
remail : $('#remail').val(),
comentarios: $('#rcomentarios').val() },
       
//url: "http://intranet.xube.com.mx/thmovil/com/getclientes.asp"
url: 'http://www.jbandala.mx/registrame/registrame.php',
//url: "http://10.32.127.5/thmovil/com/asp/getclientes.asp"
success: function(respuesta) {

    if (respuesta == 1){
            navigator.notification.alert(
    'Registro guardado!',  // message
    function err(){},         // callback
    'Mensaje',            // title
    'OK'                  // buttonName
);
$('#registroadd input').val('');
$('#registroadd textarea').val('');
$('#registroadd #rfoto').html(''); 
}else{
      navigator.notification.alert(
    respuesta,  // message
    function err(){},         // callback
    'Mensaje',            // title
    'OK'                  // buttonName
);
}




    }});

   


 }); //reenviar

$('.rlimpiar').click(function(){
$('#registroadd input').val('');
$('#registroadd textarea').val('');
$('#registroadd #rfoto').html('');


   

});//rlimpiar


$('.eventorow').click(function(){
 
  
var idevento = $(this).attr('id');
evento = idevento;
$.mobile.changePage( "#registrolist", {transition: "none"});

});






});


function listarregistros(idevento){
      $('#listadoregistros').html('');

$.ajax({
        type: "POST",
        data: {nevento : idevento },
       
//url: "http://intranet.xube.com.mx/thmovil/com/getclientes.asp"
url: 'http://www.jbandala.mx/registrame/listaregistro.php',
//url: "http://10.32.127.5/thmovil/com/asp/getclientes.asp"
success: function(respuesta) {
var registros = JSON.parse(respuesta);

    $.each(registros, function(i, val){
    $('#listadoregistros').append('<li><a id="'+$.trim(val.IDR)+'" href="#" onclick="clickregistro(this);"><h2>'+$.trim(val.NOMBRE)+'</h2></a><a id="'+$.trim(val.IDR)+'" href="#"  onclick="clickProducto(this);" data-position-to="window">Editar</a></li>');
    });

      $('#listadoregistros').listview('refresh');

 }});


} 





function clickregistro(elem){

var idregistro = $(elem).attr('id');
$.mobile.changePage( "#registroedit", {transition: "none"}); 

$.ajax({
        type: "POST",
        data: {idreg : idregistro },       
url: 'http://www.jbandala.mx/registrame/leeregistro.php',
success: function(respuesta) {
var registros = JSON.parse(respuesta);

 $.each(registros, function(i, val){
    

 $('#renombre').val(val.NOMBRE);
 $('#reempresa').val(val.EMPRESA);
 $('#retwitter').val(val.TWITTER);
 $('#retoficina').val(val.TOFICINA);
 $('#retmovil').val(val.TMOVIL);
 $('#reemail').val(val.EMAIL);
 $('#recomentarios').val(val.COMENTARIOS);
 $('#ride').val(val.IDR);




    });

 }});




}

function clickEliminar(){

    $.ajax({
        type: "POST",
        data: {idreg : $('#ride').val()},       
url: 'http://www.jbandala.mx/registrame/eliminaregistro.php',
success: function(respuesta) {
$('#registroadd input').val('');
$('#registroadd textarea').val('');
$('#registroadd #rfoto').html('');

navigator.notification.alert(
    'Registro Eliminado',  // message
    function err(){
     $.mobile.changePage( "#registrolist", {transition: "none"});

});
    },         // callback
    'Mensaje',            // title
    'OK'                  // buttonName
);

 }});
 
}



document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        checkConnection();
    }

        function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            navigator.notification.alert(
    states[networkState],  // message
    function err(){},         // callback
    'Tipo de conexión',            // title
    'OK'                  // buttonName
);


          
        }








