const firebaseURL = "https://practicumii-a9956-default-rtdb.firebaseio.com/mediciones.json";

async function obtenerDatos() {
  try {
    const response = await fetch(firebaseURL);
    const data = await response.json();

    if (!data) return;

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    data.forEach((v, i) => {
      const item = document.createElement("li");
      item.textContent = `Canal ${i + 1}: ${v.toFixed(4)} V`;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

setInterval(obtenerDatos, 2000);
obtenerDatos();
