const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
const mensaje = document.getElementById('mensaje');
const final = document.getElementById('final');
const btnSiguiente = document.getElementById('btnSiguiente');
const preparacion = document.getElementById('preparacion');

const box = 20;
const canvasSize = 300;
const gridCount = canvasSize / box;

let snake = [{ x: 7, y: 7 }];
let direction = null;
let comida = {};
let puntuacion = 0;
let pausa = false;
let juegoInterval = null;

const indirectas = [
  "¿Sabes? Siempre me fijo cuando sonríes...",
  "Me encantaría conocerte más, solo un poco a la vez.",
  "A veces, una charla casual puede ser el comienzo de algo más.",
  "¿Será que el destino nos está dando señales?",
  "Siento que podríamos ser más que amigos, ¿tú qué crees?"
];

function colocarComida() {
  comida = {
    x: Math.floor(Math.random() * gridCount),
    y: Math.floor(Math.random() * gridCount)
  };
  while (snake.some(s => s.x === comida.x && s.y === comida.y)) {
    comida.x = Math.floor(Math.random() * gridCount);
    comida.y = Math.floor(Math.random() * gridCount);
  }
}

function dibujar() {
  ctx.fillStyle = '#142850';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#f39c12';
  ctx.fillRect(comida.x * box, comida.y * box, box, box);

  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? '#1abc9c' : '#16a085';
    ctx.fillRect(segment.x * box, segment.y * box, box, box);
  });
}

function actualizar() {
  if (!direction || pausa) return;

  let cabeza = { ...snake[0] };
  if (direction === 'up') cabeza.y--;
  if (direction === 'down') cabeza.y++;
  if (direction === 'left') cabeza.x--;
  if (direction === 'right') cabeza.x++;

  if (
    cabeza.x < 0 || cabeza.x >= gridCount ||
    cabeza.y < 0 || cabeza.y >= gridCount
  ) return juegoTerminado();

  if (snake.some(seg => seg.x === cabeza.x && seg.y === cabeza.y)) {
    return juegoTerminado();
  }

  snake.unshift(cabeza);

  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    puntuacion++;
    mostrarIndirecta();
    colocarComida();

    if (puntuacion === 5) {
      juegoCompletado();
      return;
    }

    pausa = true;
    clearInterval(juegoInterval);

    // Mostrar el botón "Siguiente" después de 3 segundos
    setTimeout(() => {
      btnSiguiente.style.display = 'inline-block';
    }, 3000);
  } else {
    snake.pop();
  }
}

function mostrarIndirecta() {
  let index = Math.min(puntuacion - 1, indirectas.length - 1);
  mensaje.textContent = indirectas[index];
}

function iniciarCuentaRegresiva() {
  let segundos = 5;
  btnSiguiente.style.display = 'none';
  preparacion.style.display = 'block';
  mensaje.textContent = '';
  preparacion.textContent = `Prepárate... el juego se reanuda en ${segundos} segundos`;

  let cuenta = setInterval(() => {
    segundos--;
    if (segundos > 0) {
      preparacion.textContent = `Prepárate... el juego se reanuda en ${segundos} segundos`;
    } else {
      clearInterval(cuenta);
      preparacion.style.display = 'none';
      reanudarJuego();
    }
  }, 1000);
}

function juegoTerminado() {
  alert("¡Uy! Chocaste... vuelve a intentarlo.");
  reiniciar();
}

function juegoCompletado() {
  mensaje.textContent = "¡Felicidades! Nivel 2 completado.";
  final.classList.remove('oculto');
  clearInterval(juegoInterval);

  // Mostrar el botón "Siguiente" para avanzar al nivel 3
  btnSiguiente.style.display = 'inline-block';
  btnSiguiente.textContent = "Ir al Nivel 3";
  // Cambiamos el evento para redirigir al nivel 3
  btnSiguiente.onclick = () => {
    window.location.href = 'nivel3.html'; // Ajusta esta ruta según tu estructura
  };
}

function reiniciar() {
  snake = [{ x: 7, y: 7 }];
  direction = null;
  puntuacion = 0;
  mensaje.textContent = "Come la comida para descubrir una indirecta...";
  colocarComida();
  pausa = false;
  clearInterval(juegoInterval);
  juegoInterval = setInterval(() => {
    actualizar();
    dibujar();
  }, 300);
}

function reanudarJuego() {
  pausa = false;
  juegoInterval = setInterval(() => {
    actualizar();
    dibujar();
  }, 300);
}

btnSiguiente.addEventListener('click', () => {
  iniciarCuentaRegresiva();
});

document.addEventListener('keydown', e => {
  if (e.key === "ArrowUp" && direction !== 'down') direction = 'up';
  if (e.key === "ArrowDown" && direction !== 'up') direction = 'down';
  if (e.key === "ArrowLeft" && direction !== 'right') direction = 'left';
  if (e.key === "ArrowRight" && direction !== 'left') direction = 'right';
});

// Botones móviles
document.getElementById('up').addEventListener('click', () => { if (direction !== 'down') direction = 'up'; });
document.getElementById('down').addEventListener('click', () => { if (direction !== 'up') direction = 'down'; });
document.getElementById('left').addEventListener('click', () => { if (direction !== 'right') direction = 'left'; });
document.getElementById('right').addEventListener('click', () => { if (direction !== 'left') direction = 'right'; });

colocarComida();
juegoInterval = setInterval(() => {
  actualizar();
  dibujar();
}, 300);
