let nivel = 1;
let subnivel = 1;

function avanzar() {
  if (subnivel < 5) {
    subnivel++;
  } else {
    if (nivel < 3) {
      nivel++;
      subnivel = 1;
    } else {
      document.getElementById("juego").classList.add("oculto");
      document.getElementById("final").classList.remove("oculto");

      // Esperar 3 segundos y luego redirigir
      setTimeout(() => {
        window.location.href = "../html/index.html"; // Revisa esta ruta también
      }, 5000);

      return;
    }
  }

  let mensaje = `Nivel ${nivel} - Subnivel ${subnivel}`;
  if (subnivel === 5) {
    mensaje += " (Boss 🐉)";
  }

  document.getElementById("mensaje").textContent = mensaje;
}
