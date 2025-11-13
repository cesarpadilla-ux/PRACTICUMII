// URL de tu base de datos Firebase
const firebaseURL = "https://practicumii-a9956-default-rtdb.firebaseio.com/datos.json";

async function obtenerDatos() {
  try {
    // Solo pedimos el último paquete
    const response = await fetch(firebaseURL + "?orderBy=\"timestamp\"&limitToLast=1");
    const data = await response.json();

    if (!data) return;

    // Tomar el último nodo
    const ultimo = Object.values(data)[0];
    if (!ultimo || !ultimo.datos) return;

    // Tomar el último grupo de voltajes
    const voltajes = ultimo.datos[ultimo.datos.length - 1];

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    voltajes.forEach((v, i) => {
      const item = document.createElement("li");
      item.textContent = `Canal ${i + 1}: ${v.toFixed(4)} V`;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error("⚠️ Error al obtener datos:", error);
  }
}

// Actualiza la lista cada 200 ms (5 Hz)
setInterval(obtenerDatos, 200);
obtenerDatos();
