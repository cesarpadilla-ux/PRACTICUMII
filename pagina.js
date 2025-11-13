// Asegúrate que este URL coincide con el usado por el Python (datos.json)
const firebaseURL = "https://practicumii-a9956-default-rtdb.firebaseio.com/datos.json";

async function obtenerDatos() {
  try {
    const res = await fetch(firebaseURL);
    if (!res.ok) {
      console.error("Fetch error:", res.status, res.statusText);
      return;
    }
    const data = await res.json();
    if (!data) {
      // nada disponible aún
      return;
    }

    // Firebase devuelve un objeto donde cada key es un push id; extraemos valores
    const entradas = Object.values(data);
    if (entradas.length === 0) return;

    // la última entrada publicada (más reciente push)
    const ultima = entradas[entradas.length - 1];

    // Si tu Python publica un paquete (lista de muestras) en cada POST,
    // 'ultima' será un array: [ {timestamp, canales}, {timestamp, canales}, ... ]
    const listaDOM = document.getElementById("lista");
    const metaDOM = document.getElementById("meta");
    listaDOM.innerHTML = "";

    // mostrar timestamp del paquete (tomamos timestamp del último elemento dentro del paquete)
    let ts = null;
    if (Array.isArray(ultima) && ultima.length > 0) {
      ts = ultima[ultima.length - 1].timestamp;
    } else if (ultima.timestamp) {
      ts = ultima.timestamp;
    }

    if (ts) {
      const d = new Date(ts * 1000);
      metaDOM.textContent = `Paquete con ${Array.isArray(ultima) ? ultima.length : 1} muestras — última: ${d.toLocaleString()}`;
    } else {
      metaDOM.textContent = `Paquete recibido`;
    }

    // Si es un arreglo de muestras, recorremos; si no, tratarlo como 1 objeto
    const muestras = Array.isArray(ultima) ? ultima : [ultima];

    // Mostrar cada muestra con sus canales
    muestras.forEach((muestra, idxM) => {
      const canales = muestra.canales || [];
      const header = document.createElement("li");
      header.textContent = `Muestra ${idxM + 1} — ts: ${muestra.timestamp ? new Date(muestra.timestamp * 1000).toLocaleTimeString() : "--"}`;
      listaDOM.appendChild(header);
      canales.forEach((v, idxC) => {
        const item = document.createElement("li");
        item.textContent = `  Canal ${idxC + 1}: ${Number(v).toFixed(4)} V`;
        listaDOM.appendChild(item);
      });
    });

    // Limitar visualización a N elementos (evita crecer indefinidamente)
    const MAX_ITEMS = 200;
    while (listaDOM.children.length > MAX_ITEMS) {
      listaDOM.removeChild(listaDOM.firstChild);
    }

  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

setInterval(obtenerDatos, 1000);
obtenerDatos();
