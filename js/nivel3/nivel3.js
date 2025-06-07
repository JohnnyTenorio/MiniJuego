// nivel3.js - Juego Laberinto mejorado con múltiples indirectas

const canvas = document.getElementById("laberinto");
const ctx = canvas.getContext("2d");
const mensaje = document.getElementById("mensaje");
const final = document.getElementById("final");
const contador = document.getElementById("contador");

const tileSize = 50;
let jugador = { x: 1, y: 1 };

const mapa = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 2, 0, 2, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 2, 0, 0, 1, 0, 2, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Array con las indirectas que pueden salir
const indirectas = [
    "¿Y si ya dejamos de jugar? 🙈",
    "No todo es lo que parece... 🤔",
    "Sigue buscando, la verdad está cerca 🔍",
    "A veces hay que retroceder para avanzar ⬅️",
    "Las indirectas más directas están en el camino 🛤️",
    "¿Lo tienes claro o necesitas más pistas? 💡",
    "Sigue con calma, no te desesperes ⏳",
];

function dibujarMapa() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < mapa.length; y++) {
        for (let x = 0; x < mapa[y].length; x++) {
            if (mapa[y][x] === 1) {
                ctx.fillStyle = "#2c3e50"; // pared
            } else if (mapa[y][x] === 2) {
                ctx.fillStyle = "#f1c40f"; // indirecta
            } else if (mapa[y][x] === 3) {
                ctx.fillStyle = "#2ecc71"; // salida
            } else {
                ctx.fillStyle = "#ecf0f1"; // camino
            }
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    // Dibujar jugador
    ctx.fillStyle = "#e74c3c";
    ctx.beginPath();
    ctx.arc(
        jugador.x * tileSize + tileSize / 2,
        jugador.y * tileSize + tileSize / 2,
        tileSize / 3,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function mover(dx, dy) {
    const nuevaX = jugador.x + dx;
    const nuevaY = jugador.y + dy;

    if (mapa[nuevaY][nuevaX] !== 1) {
        jugador.x = nuevaX;
        jugador.y = nuevaY;
        const celda = mapa[nuevaY][nuevaX];

        if (celda === 2) {
            // Mostrar una indirecta aleatoria
            const indice = Math.floor(Math.random() * indirectas.length);
            mensaje.textContent = indirectas[indice];
        } else if (celda === 3) {
            mensaje.textContent = "¡Llegaste! Ya no hay dudas ❤️";
            final.classList.remove("oculto");

            // Ocultar el canvas y controles
            canvas.style.display = "none";
            document.getElementById("controles-movil").style.display = "none";
            mensaje.style.display = "none";

            // Mostrar el contador y empezar cuenta regresiva
            contador.style.display = "block";

            let segundos = 7;
            contador.textContent = `Redirigiendo en ${segundos} segundos...`;

            const intervalo = setInterval(() => {
                segundos--;
                contador.textContent = `Redirigiendo en ${segundos} segundos...`;
                if (segundos === 0) {
                    clearInterval(intervalo);
                    // Redirigir a la página con el mensaje
                    window.location.href = "../../html/mensajeFinal.html";  // <-- Cambia por la ruta correcta si quieres
                }
            }, 1000);
        }
        else {
            mensaje.textContent = "Sigue buscando el camino correcto...";
        }
    }
    dibujarMapa();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") mover(0, -1);
    else if (e.key === "ArrowDown") mover(0, 1);
    else if (e.key === "ArrowLeft") mover(-1, 0);
    else if (e.key === "ArrowRight") mover(1, 0);
});

// controles móviles
const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");

up.addEventListener("click", () => mover(0, -1));
down.addEventListener("click", () => mover(0, 1));
left.addEventListener("click", () => mover(-1, 0));
right.addEventListener("click", () => mover(1, 0));

dibujarMapa();
