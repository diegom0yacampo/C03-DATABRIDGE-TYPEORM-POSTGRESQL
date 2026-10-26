import { useEffect, useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Libro = {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
};

const API_URL = 'http://192.168.104.66:3000';

export default function App() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [error, setError] = useState('');

  async function cargar() {
    try {
      const respuesta = await fetch(API_URL + '/libros');
      setLibros(await respuesta.json());
      setError('');
    } catch {
      setError('No se pudo conectar con la API');
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  async function eliminar(id: number) {
    try {
      const respuesta = await fetch(API_URL + '/libros/' + id, { method: 'DELETE' });
      if (!respuesta.ok) {
        setError('No se pudo eliminar (' + respuesta.status + ')');
        return;
      }
      setLibros((actuales) => actuales.filter((libro) => libro.id !== id));
    } catch {
      setError('No se pudo conectar con la API');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📚 My Library</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={libros}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text>No quedan libros</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.libro}>📚 {item.titulo}</Text>
            <Text style={styles.autor}>{item.autor} · {item.genero}</Text>
            <Button title="Eliminar" color="#DC2626" onPress={() => eliminar(item.id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FEFCE8' },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 16 },
  error: { color: '#DC2626', marginBottom: 12 },
  card: { backgroundColor: '#FFF', padding: 18, borderRadius: 16, marginBottom: 12 },
  libro: { fontSize: 18, fontWeight: '700' },
  autor: { color: '#57534E', marginTop: 4, marginBottom: 10 },
});
