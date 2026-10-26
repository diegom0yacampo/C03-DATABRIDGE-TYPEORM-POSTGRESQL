# Ejercicio 07 · Sneaker Vault

CRUD completo de sneakers con NestJS, TypeORM y PostgreSQL (databridge_e07).
Hay DTOs de creación y de actualización, y el Controller expone GET, GET /:id, POST, PATCH y DELETE.
La app permite añadir una sneaker con un formulario, rebajar su precio y eliminarla.
Después de cada operación se vuelve a llamar a cargar() para sincronizar la lista.
