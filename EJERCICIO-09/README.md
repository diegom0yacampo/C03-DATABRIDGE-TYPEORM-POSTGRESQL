# Ejercicio 09 · Event Radar

API de eventos en databridge_e09 que se pueden filtrar con Query Params.
El Controller recibe la ciudad con @Query y el Service monta el where solo si llega el filtro.
Si no se envía ciudad se devuelven todos los eventos ordenados por fecha.
En la app se escribe una ciudad y se hace la petición GET /eventos?ciudad=... para mostrar los resultados.
