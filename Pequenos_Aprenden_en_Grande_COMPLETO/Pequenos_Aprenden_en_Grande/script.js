const ruleta = document.getElementById("ruleta");
const boton = document.getElementById("botonGirar");
const resultado = document.getElementById("resultado");
const linkCuento = document.getElementById("linkCuento");

let girando = false;
let vueltas = 0;

// Cada número corresponde a una página de cuento.
const cuentos = {
    1: {
        titulo: "EL GATO CON BOTAS",
        enlace: "cuentos/gatoconbotas.html"
    },
    2: {
        titulo: "HANSEL Y GRETEL",
        enlace: "cuentos/hanselygretel.html"
    },
    3: {
        titulo: "LOS TRES CHANCHITOS",
        enlace: "cuentos/lostreschanchitos.html"
    },
    4: {
        titulo: "CAPERUCITA ROJA",
        enlace: "cuentos/caperucitaroja.html"
    }
};

function girarRuleta() {
    if (girando) return;

    girando = true;
    boton.disabled = true;
    linkCuento.style.display = "none";
    resultado.textContent = "La ruleta está girando...";

    // Elegir un cuento al azar, del 1 al 4.
    const numero = Math.floor(Math.random() * 4) + 1;

    // Cada sector ocupa 90 grados. El puntero está arriba.
    const angulo = (numero - 1) * 90 + 45;
    const anguloActual = vueltas % 360;
    const ajuste = (360 - angulo - anguloActual + 360) % 360;

    // Dar seis vueltas completas y detenerse en el sector elegido.
    vueltas += 360 * 6 + ajuste;
    ruleta.style.transform = `rotate(${vueltas}deg)`;

    // La animación de la ruleta dura cinco segundos (ver style.css).
    setTimeout(() => {
        resultado.innerHTML = `EL CUENTO ELEGIDO ES EL NÚMERO ${numero}<br>${cuentos[numero].titulo}`;
        linkCuento.href = cuentos[numero].enlace;
        linkCuento.style.display = "block";
        boton.disabled = false;
        girando = false;

        // Abrir automáticamente la página del cuento seleccionado.
        setTimeout(() => {
            window.location.href = cuentos[numero].enlace;
        }, 1000);
    }, 5100);
}
