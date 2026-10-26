# Ejercicio 02 · CineBox

Backend NestJS conectado a databridge_e02 que devuelve las películas con repository.find() ordenadas por puntuación.
La Entity Pelicula incluye el campo favorita, que se guarda en PostgreSQL con valor por defecto false.
El Controller expone GET /peliculas y delega la consulta en el Service.
La app recorre el array con un FlatList y pinta ♥ o ♡ según el valor de favorita.
