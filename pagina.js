const firebaseURL = "https://practicumii-a9956-default-rtdb.firebaseio.com/datos.json";

async function obtenerDatos() {
  try {
    const response = await fetch(firebaseURL);
    const data = await response.json();
    if (!data) return;

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    // Cada clave es un paquete enviado
    const paquetes = Object.values(data);
    const ultimo = paquetes[paquetes.length - 1];

    if (Array.isArray(ultimo)) {
      const ultimaMuestra = ultimo[ultimo.length - 1];
      ultimaMuestra.canales.forEach((v, i) => {
        const item = document.createElement("li");
        item.textContent = `Canal ${i + 1}: ${v.toFixed(4)} V`;
        lista.appendChild(item);
      });
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

// Actualiza cada 2 segundos
setInterval(obtenerDatos, 2000);
obtenerDatos();
