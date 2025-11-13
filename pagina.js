const firebaseURL = "https://practicumii-a9956-default-rtdb.firebaseio.com/mediciones.json";

async function obtenerDatos() {
  try {
    const response = await fetch(firebaseURL);
    const data = await response.json();
    if (!data) return;

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    // Verificar si los datos son un arreglo
    if (Array.isArray(data)) {
      data.forEach((v, i) => {
        const item = document.createElement("li");
        item.textContent = `Canal ${i + 1}: ${v.toFixed(4)} V`;
        lista.appendChild(item);
      });
    } else {
      // Si los datos no son arreglo, los mostramos como objeto
      for (const [key, value] of Object.entries(data)) {
        const item = document.createElement("li");
        item.textContent = `${key}: ${parseFloat(value).toFixed(4)} V`;
        lista.appendChild(item);
      }
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

// Llamar la función cada 2 segundos
setInterval(obtenerDatos, 2000);
obtenerDatos();
