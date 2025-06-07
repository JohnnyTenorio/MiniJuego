let personaje = document.getElementById('personaje');
let objeto = document.getElementById('objeto');
let mensaje = document.getElementById('mensaje');
let siguienteBtn = document.getElementById('siguiente');
let final = document.getElementById('final');
let obstaculos = document.querySelectorAll('.obstaculo');

let posX = 10;
let posY = 10;
let subnivel = 1;

let mensajes = {
  1: "Subnivel 1: Da el primer paso...",
  2: "Subnivel 2: Las buenas historias comienzan con una primera mirada.",
  3: "Subnivel 3: A veces una sonrisa es suficiente para empezar.",
  4: "Subnivel 4: ¿Y si esto fuera una casualidad bonita para los dos?",
  5: "Boss: ¿Crees que dos personas pueden encontrarse por algo más que suerte o por que el destino los quiere unir?"
};

document.addEventListener('keydown', (e) => mover(e.key));

function mover(direccion) {
  const paso = 10;

  if (direccion === 'ArrowUp') posY -= paso;
  if (direccion === 'ArrowDown') posY += paso;
  if (direccion === 'ArrowLeft') posX -= paso;
  if (direccion === 'ArrowRight') posX += paso;

  // Límites del mapa
  posX = Math.max(0, Math.min(270, posX));
  posY = Math.max(0, Math.min(270, posY));

  personaje.style.left = posX + 'px';
  personaje.style.top = posY + 'px';

  verificarColisiones();
}

function verificarColisiones() {
  let pRect = personaje.getBoundingClientRect();
  let oRect = objeto.getBoundingClientRect();

  let colisionObjeto = (
    pRect.left < oRect.right &&
    pRect.right > oRect.left &&
    pRect.top < oRect.bottom &&
    pRect.bottom > oRect.top
  );

  if (colisionObjeto) {
    objeto.style.display = 'none';
    siguienteBtn.style.display = 'inline-block';
  }

  obstaculos.forEach(obs => {
    let obsRect = obs.getBoundingClientRect();
    let colisionObs = (
      pRect.left < obsRect.right &&
      pRect.right > obsRect.left &&
      pRect.top < obsRect.bottom &&
      pRect.bottom > obsRect.top
    );
    if (colisionObs) {
      reiniciarSubnivel();
    }
  });
}

function reiniciarSubnivel() {
  posX = 10;
  posY = 10;
  personaje.style.left = posX + 'px';
  personaje.style.top = posY + 'px';
}

function siguienteSubnivel() {
  subnivel++;

  if (subnivel <= 5) {
    mensaje.textContent = mensajes[subnivel];
    posX = 10;
    posY = 10;
    personaje.style.left = posX + 'px';
    personaje.style.top = posY + 'px';

    objeto.style.left = `${Math.floor(Math.random() * 260)}px`;
    objeto.style.top = `${Math.floor(Math.random() * 260)}px`;
    objeto.style.display = 'block';

    if (subnivel === 5) {
      objeto.textContent = '❓';
      objeto.style.background = '#9b59b6';
    } else {
      objeto.textContent = '';
      objeto.style.background = 'gold';
    }

    siguienteBtn.style.display = 'none';
  } else {
    document.getElementById('juego').style.display = 'none';
    final.classList.remove('oculto');
  }
}
