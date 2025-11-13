const firebaseURL = "https://practicumii-a9956-default-rtdb.firebaseio.com/datos.json";

async function obtenerDatos() {
  try {
    // Pide los últimos 2 registros (por seguridad)
    const response = await fetch(firebaseURL + '?orderBy="timestamp"&limitToLast=2');
    const data = await response.json();

    if (!data) {
      console.log("⚠️ No hay datos disponibles.");
      return;
    }

    // Convierte los nodos a un arreglo y toma el último
    const registros = Object.values(data);
    const ultimo = registros[registros.length - 1];

    if (!ultimo || !ultimo.datos) {
      console.log("⚠️ No se encontró el campo 'datos' en el último registro.");
      return;
    }

    // Toma la última muestra dentro del grupo
    const voltajes = ultimo.datos[ultimo.datos.length - 1];

    // Muestra los valores
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

// Refrescar 5 veces por segundo
setInterval(obtenerDatos, 200);
obtenerDatos();
