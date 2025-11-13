const firebaseURL = "https://practicumii-a9956-default-rtdb.firebaseio.com/datos.json";

async function obtenerDatos() {
  try {
    const response = await fetch(firebaseURL + "?orderBy=\"timestamp\"&limitToLast=1");
    const data = await response.json();

    if (!data) return;

    const ultimo = Object.values(data)[0];  // extrae último registro
    const voltajes = ultimo.canales || ultimo.datos?.at(-1) || [];

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    voltajes.forEach((v, i) => {
      const item = document.createElement("li");
      item.textContent = `Canal ${i + 1}: ${v.toFixed(4)} V`;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

setInterval(obtenerDatos, 200); // cada 200 ms (5 Hz)
obtenerDatos();
