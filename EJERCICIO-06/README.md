# Ejercicio 06 · My Library

Backend con GET /libros para listar los libros y DELETE /libros/:id para borrar uno de databridge_e06.
El Service comprueba que el libro existe antes de eliminarlo con repository.remove().
La app muestra los libros y cada tarjeta tiene un botón para eliminar.
Después del DELETE se quita el libro del estado de React con filter, sin tener que recargar la app.
