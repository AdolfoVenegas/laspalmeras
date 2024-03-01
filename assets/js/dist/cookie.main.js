/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************!*\
  !*** ./cookie.js ***!
  \*******************/
$(document).ready(function () {
    // Verificar si ya se ha ejecutado el código
    var codeExecuted = localStorage.getItem('codeExecuted');

    if (!codeExecuted) {
        // El código no se ha ejecutado aún, ejecutarlo
        var allowedPaths = ['/home', '/'];
        var currentPath = window.location.pathname.replace('.html', '');

        // Esperar 2 segundos después de que la página se haya cargado
        setTimeout(function () {
            if (allowedPaths.includes(currentPath)) {
                // Agregar la propiedad visibility: visible al body
                $('body').addClass('no-scroll');
                $('.modal').addClass('show_modal');
                $('.show_modal').addClass('fadeIn');

                // Cerrar el modal
                $('.btn_modal').on('click', function () {
                    $('.modal').addClass('animationless');
                    $('.wrap').addClass('animationless2');
                    $('.show_modal').removeClass('fadeIn');
                    $('body').removeClass('no-scroll');
                });

                // Establecer el indicador de que el código se ha ejecutado
                localStorage.setItem('codeExecuted', true);
            }
        }, 2000); // 2000 milisegundos (2 segundos)
    }

});
/******/ })()
;
//# sourceMappingURL=cookie.main.js.map