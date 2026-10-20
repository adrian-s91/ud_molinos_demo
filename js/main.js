
document.addEventListener("DOMContentLoaded", function () {
    // Actualizar automáticamente el año del pie de página
    const anios = document.querySelectorAll(".anio-actual");

    anios.forEach(function (elemento) {
        elemento.textContent = new Date().getFullYear();
    });

    // Menú desplegable para móviles
    const botonMenu = document.querySelector(".menu-toggle");
    const navegacion = document.querySelector(".navegacion");

    if (botonMenu && navegacion) {
        botonMenu.addEventListener("click", function () {
            navegacion.classList.toggle("abierto");

            const abierto = navegacion.classList.contains("abierto");

            botonMenu.setAttribute("aria-expanded", abierto);
            botonMenu.setAttribute(
                "aria-label",
                abierto ? "Cerrar menú" : "Abrir menú"
            );

            botonMenu.textContent = abierto ? "✕" : "☰";
        });
    }
});
