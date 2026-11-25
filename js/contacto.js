const formulario = document.getElementById("form-contacto");
const estado = document.getElementById("estado-formulario");

// Endpoint de tu propio servidor backend
const URL_SERVIDOR = "http://localhost:3000/api/contacto";

if (formulario && estado) {
  formulario.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const asunto = document.getElementById("asunto").value;
  const mensaje = document.getElementById("mensaje").value.trim();

  if (nombre.length < 3 || mensaje.length < 5) {
    estado.textContent =
      "Completa tu nombre y un mensaje un poco más detallado.";
    return;
  }

  estado.textContent = "Guardando mensaje en la base de datos...";

  try {
    const respuesta = await fetch(URL_SERVIDOR, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, correo, asunto, mensaje }),
      });
    }

    const datos = await respuesta.json();

    if (respuesta.ok) {
      estado.textContent = datos.mensaje || "¡Mensaje guardado correctamente!";
      formulario.reset();
    } else {
      estado.textContent = datos.error || "No se pudo guardar el mensaje.";
    }
  } catch (error) {
    estado.textContent =
      "No se pudo conectar con el servidor. Verifica que el backend esté encendido.";
  }
});
