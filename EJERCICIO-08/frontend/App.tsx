import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Cancion = {
  id: number;
  titulo: string;
  artista: string;
};

type Playlist = {
  id: number;
  nombre: string;
  canciones: Cancion[];
};

const API_URL = 'http://192.168.104.66:3000';

export default function App() {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [error, setError] = useState('');

  async function cargar() {
    try {
      const respuesta = await fetch(API_URL + '/playlists/1');
      if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);
      setPlaylist(await respuesta.json());
    } catch {
      setError('No se pudo cargar la playlist');
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  if (error) return <Text style={styles.mensaje}>{error}</Text>;
  if (!playlist) return <Text style={styles.mensaje}>Cargando...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.eyebrow}>MY PLAYLISTS</Text>
      <Text style={styles.title}>🎵 {playlist.nombre}</Text>
      <Text style={styles.total}>{playlist.canciones.length} canciones</Text>
      <FlatList
        data={playlist.canciones}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cancion}>🎵 {item.titulo}</Text>
            <Text style={styles.artista}>{item.artista}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E1B4B' },
  eyebrow: { color: '#A5B4FC', fontWeight: '800', letterSpacing: 2 },
  title: { color: '#FFF', fontSize: 30, fontWeight: '800', marginTop: 4 },
  total: { color: '#C7D2FE', marginBottom: 16 },
  card: { backgroundColor: '#312E81', padding: 16, borderRadius: 14, marginBottom: 10 },
  cancion: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  artista: { color: '#C7D2FE', marginTop: 4 },
  mensaje: { marginTop: 80, textAlign: 'center' },
});
