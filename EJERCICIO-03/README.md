# Ejercicio 03 · Pet Profile

API que busca una mascota concreta en databridge_e03 a partir del id que llega en la URL (GET /mascotas/:id).
El Controller lee el id con @Param y ParseIntPipe, y el Service usa findOneBy; si no existe devuelve 404.
La Entity Mascota tiene el campo nivelEnergia guardado en PostgreSQL.
La app pide /mascotas/1 y muestra la ficha con el nivel de energía.
