# Ejercicio 05 · Travel Book

API con PATCH /viajes/:id para modificar solo una parte de un viaje guardado en databridge_e05.
El DTO de actualización tiene los campos opcionales para poder enviar solo lo que cambia.
El Service busca el viaje, aplica los cambios con merge() y los guarda con save(); si no existe da 404.
Desde la app se edita el estado del viaje y se muestra el resultado que devuelve la API.
