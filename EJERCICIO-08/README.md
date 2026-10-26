# Ejercicio 08 · My Playlists

Relación entre Playlist y Cancion: una playlist tiene muchas canciones (OneToMany) y cada canción pertenece a una playlist (ManyToOne).
La clave foránea está en la tabla canciones de databridge_e08.
GET /playlists/:id devuelve la playlist junto con sus canciones usando relations.
La app muestra el nombre de la playlist y la lista de canciones que trae la API.
