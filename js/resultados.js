
const partidos = [
    {
        categoria: "Regional",
        equipo: "A",
        fecha: "25/10/2026",
        local: "UD Los Molinos",
        visitante: "Nombre del rival",
        marcador: "2 - 1",
        estado: "Finalizado"
    },
    {
        categoria: "Regional",
        equipo: "A",
        fecha: "15/10/2026",
        local: "UD Los Molinos",
        visitante: "Nombre del rival",
        marcador: "4 - 0",
        estado: "Finalizado"
    },
    {
        categoria: "Juvenil",
        equipo: "A",
        fecha: "Por confirmar",
        local: "UD Los Molinos Juvenil A",
        visitante: "Nombre del rival",
        marcador: "-",
        estado: "Próximo partido"
    }
];

document.addEventListener("DOMContentLoaded", function () {
    const botonesCategorias = document.querySelectorAll(".boton-filtro");
    const botonesEquipos = document.querySelectorAll(".boton-equipo");

    const contenedor = document.getElementById("lista-partidos");
    const titulo = document.getElementById("titulo-seleccion");
    const subtitulo = document.getElementById("subtitulo-seleccion");

    if (
        botonesCategorias.length === 0 ||
        botonesEquipos.length === 0 ||
        !contenedor ||
        !titulo ||
        !subtitulo
    ) {
        return;
    }

    let categoriaSeleccionada = "Regional";
    let equipoSeleccionado = "A";

    function convertirFecha(fecha) {
        const partes = fecha.split("/");

        if (partes.length !== 3) {
            return null;
        }

        const dia = Number(partes[0]);
        const mes = Number(partes[1]);
        const anio = Number(partes[2]);

        if (!dia || !mes || !anio) {
            return null;
        }

        const fechaConvertida = new Date(anio, mes - 1, dia);

        if (
            fechaConvertida.getFullYear() !== anio ||
            fechaConvertida.getMonth() !== mes - 1 ||
            fechaConvertida.getDate() !== dia
        ) {
            return null;
        }

        return fechaConvertida;
    }

    function mostrarPartidos() {
        titulo.textContent =
            categoriaSeleccionada + " · Equipo " + equipoSeleccionado;

        subtitulo.textContent = "Calendario y resultados";
        contenedor.innerHTML = "";

        const partidosFiltrados = partidos.filter(function (partido) {
            return partido.categoria === categoriaSeleccionada &&
                   partido.equipo === equipoSeleccionado;
        });

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        partidosFiltrados.sort(function (a, b) {
            const fechaA = convertirFecha(a.fecha);
            const fechaB = convertirFecha(b.fecha);

            if (fechaA === null && fechaB === null) {
                return 0;
            }

            if (fechaA === null) {
                return 1;
            }

            if (fechaB === null) {
                return -1;
            }

            const futuroA = fechaA >= hoy;
            const futuroB = fechaB >= hoy;

            if (futuroA && !futuroB) {
                return -1;
            }

            if (!futuroA && futuroB) {
                return 1;
            }

            if (futuroA && futuroB) {
                return fechaA - fechaB;
            }

            return fechaB - fechaA;
        });

        if (partidosFiltrados.length === 0) {
            const mensaje = document.createElement("p");

            mensaje.className = "mensaje-sin-partidos";
            mensaje.textContent =
                "Todavía no hay partidos añadidos para " +
                categoriaSeleccionada + " · Equipo " +
                equipoSeleccionado + ".";

            contenedor.appendChild(mensaje);
            return;
        }

        partidosFiltrados.forEach(function (partido) {
            const tarjeta = document.createElement("article");
            tarjeta.className = "partido";

            const fecha = document.createElement("div");
            fecha.className = "partido-fecha";
            fecha.textContent = partido.fecha;

            const equipos = document.createElement("div");
            equipos.className = "partido-equipos";

            const nombres = document.createElement("div");
            nombres.textContent =
                partido.local + " - " + partido.visitante;

            const estado = document.createElement("div");
            estado.className = "partido-detalle";
            estado.textContent = partido.estado;

            equipos.appendChild(nombres);
            equipos.appendChild(estado);

            const marcador = document.createElement("div");
            marcador.className = "marcador";
            marcador.textContent = partido.marcador;

            tarjeta.appendChild(fecha);
            tarjeta.appendChild(equipos);
            tarjeta.appendChild(marcador);

            contenedor.appendChild(tarjeta);
        });
    }

    botonesCategorias.forEach(function (boton) {
        boton.addEventListener("click", function () {
            categoriaSeleccionada = boton.dataset.categoria;

            botonesCategorias.forEach(function (otroBoton) {
                const activo = otroBoton === boton;

                otroBoton.classList.toggle("activo", activo);
                otroBoton.setAttribute("aria-pressed", activo);
            });

            mostrarPartidos();
        });
    });

    botonesEquipos.forEach(function (boton) {
        boton.addEventListener("click", function () {
            equipoSeleccionado = boton.dataset.equipo;

            botonesEquipos.forEach(function (otroBoton) {
                const activo = otroBoton === boton;

                otroBoton.classList.toggle("activo", activo);
                otroBoton.setAttribute("aria-pressed", activo);
            });

            mostrarPartidos();
        });
    });

    mostrarPartidos();
});
