const firebaseURL = "https://practicumii-a9956-default-rtdb.firebaseio.com/datos.json";

async function obtenerDatos() {
  try {
    const response = await fetch(firebaseURL);
    const data = await response.json();
    if (!data) return;

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    const paquetes = Object.values(data);
    const ultimoPaquete = paquetes[paquetes.length - 1];
    if (!Array.isArray(ultimoPaquete)) return;

    const ultimaMuestra = ultimoPaquete[ultimoPaquete.length - 1];
    if (!ultimaMuestra?.canales) return;

    ultimaMuestra.canales.forEach((v, i) => {
      const li = document.createElement("li");
      li.textContent = `Canal ${i + 1}: ${v.toFixed(4)} V`;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

setInterval(obtenerDatos, 2000);
obtenerDatos();
