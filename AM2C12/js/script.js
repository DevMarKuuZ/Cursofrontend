// Esperar a que el DOM cargue
$(document).ready(function () {
    
    function mostrarSecciones() {
        $(".seccion").each(function () {
            const top = $(this).offset().top;
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (top < scrollTop + windowHeight - 100) {
                $(this).addClass("visible");
            }
        });
    }

    $(window).on("scroll", mostrarSecciones);
    mostrarSecciones();

    
    $("#btnTema").on("click", function () {
        $("body").toggleClass("dark-mode").toggleClass("light-mode");
    });

    
    $("#sobre-mi").addClass("seccion-color-dinamico");
    let alternarColor = false;

    $("#btnColorSeccion").on("click", function () {
        alternarColor = !alternarColor;
        if (alternarColor) {
            $("#sobre-mi").css("background-color", "#0f172a").css("color", "#e5e7eb");
        } else {
            $("#sobre-mi").css("background-color", "").css("color", "");
        }
    });

    
    const $form = $("#formContacto");
    const $nombre = $("#nombre");
    const $correo = $("#correo");
    const $mensaje = $("#mensaje");
    const $estado = $("#estadoFormulario");

    function validarCampo($campo) {
        if (!$campo.val().trim()) {
            $campo.addClass("is-invalid").removeClass("is-valid");
            return false;
        } else {
            $campo.addClass("is-valid").removeClass("is-invalid");
            return true;
        }
    }

    function validarCorreo($campo) {
        const valor = $campo.val().trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(valor)) {
            $campo.addClass("is-invalid").removeClass("is-valid");
            return false;
        } else {
            $campo.addClass("is-valid").removeClass("is-invalid");
            return true;
        }
    }

    $nombre.on("input", function () {
        validarCampo($nombre);
    });

    $correo.on("input", function () {
        validarCorreo($correo);
    });

    $mensaje.on("input", function () {
        validarCampo($mensaje);
    });

    $form.on("submit", function (e) {
        e.preventDefault();

        const validoNombre = validarCampo($nombre);
        const validoCorreo = validarCorreo($correo);
        const validoMensaje = validarCampo($mensaje);

        if (validoNombre && validoCorreo && validoMensaje) {
            $estado.text("Mensaje enviado correctamente (simulado).")
                .removeClass("text-danger")
                .addClass("text-success");
            $form[0].reset();
            $(".form-control").removeClass("is-valid is-invalid");
        } else {
            $estado.text("Por favor, corrige los campos marcados.")
                .removeClass("text-success")
                .addClass("text-danger");
        }
    });
});