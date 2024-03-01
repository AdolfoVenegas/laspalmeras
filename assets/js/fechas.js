$(document).ready(function () {
    // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
    var diaDeLaSemana = new Date().getDay();
    var imagenesPorDia = [
        "domingo.webp",
        "lunes.webp",
        "martes.webp",
        "miércoles.webp",
        "jueves.webp",
        "viernes.webp",
        "sabado.webp"
    ];
    var rutaImagenes = "assets/img/";
    // Función para mostrar la imagen correspondiente al día de la semana
    function mostrarImagenSegunDia(dia) {
        var rutaCompleta = rutaImagenes + imagenesPorDia[dia];

        // Verificar si el archivo existe
        $.ajax({
            url: rutaCompleta,
            type: 'HEAD',
            error: function () {
                //console.log("No se encontró el archivo para el día de la semana.");
            },
            success: function () {
                $(".modal-fondo").css('background-image', 'url(' + rutaCompleta + ')');
            }
        });
    }
    // Mostrar la imagen correspondiente al día actual
    mostrarImagenSegunDia(diaDeLaSemana);
});