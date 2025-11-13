const firebaseURL = "https://practicumii-a9956-default-rtdb.firebaseio.com/datos.json";

async function obtenerDatos() {
  try {
    const response = await fetch(firebaseURL);
    const data = await response.json();

    if (!data) return;

    const keys = Object.keys(data);
    const ultimo = data[keys[keys.length - 1]]; // último paquete enviado

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    if (Array.isArray(ultimo)) {
      // Si Firebase tiene paquetes de varios datos
      const ultimaLectura = ultimo[ultimo.length - 1];
      ultimaLectura.canales.forEach((v, i) => {
        const item = document.createElement("li");
        item.textContent = `Canal ${i + 1}: ${v.toFixed(4)} V`;
        lista.appendChild(item);
      });
    } else if (ultimo.canales) {
      // Si Firebase tiene un solo objeto
      ultimo.canales.forEach((v, i) => {
        const item = document.createElement("li");
        item.textContent = `Canal ${i + 1}: ${v.toFixed(4)} V`;
        lista.appendChild(item);
      });
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

setInterval(obtenerDatos, 2000);
obtenerDatos();
