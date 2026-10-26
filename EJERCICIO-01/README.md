# Ejercicio 01 · Game Vault

API en NestJS que guarda videojuegos en PostgreSQL (databridge_e01) usando TypeORM.
La Entity Videojuego tiene título, plataforma, puntuación y el campo nuevo género.
El Service usa el Repository para leer los juegos y el Controller los expone en GET /videojuegos.
La app de Expo pide la lista a la API y muestra cada juego en una tarjeta con su género.
