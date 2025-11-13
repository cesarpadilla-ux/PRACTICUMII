const firebaseURL = "https://practicumii-a9956-default-rtdb.firebaseio.com/datos.json";

async function obtenerDatos() {
  try {
    const response = await fetch(firebaseURL);
    const data = await response.json();

    if (!data) return;

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    // Recorrer paquetes
    data.forEach(paquete => {
      paquete.forEach((v, i) => {
        const item = document.createElement("li");
        item.textContent = `Canal ${i + 1}: ${v.toFixed(4)} V`;
        lista.appendChild(item);
      });
    });

    // Limitar número de elementos mostrados
    const MAX_ITEMS = 50;
    while (lista.children.length > MAX_ITEMS) {
      lista.removeChild(lista.firstChild);
    }

  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

setInterval(obtenerDatos, 1000); // actualizar cada 1 segundo
obtenerDatos();
