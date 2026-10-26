import { useEffect, useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

type Evento = {
  id: number;
  nombre: string;
  ciudad: string;
  categoria: string;
  fecha: string;
};

const API_URL = 'http://192.168.104.66:3000';

export default function App() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [ciudad, setCiudad] = useState('Zaragoza');
  const [error, setError] = useState('');

  async function filtrar() {
    try {
      let url = API_URL + '/eventos';
      if (ciudad.trim() !== '') {
        url += '?ciudad=' + encodeURIComponent(ciudad.trim());
      }
      const respuesta = await fetch(url);
      setEventos(await respuesta.json());
      setError('');
    } catch {
      setError('No se pudo conectar con la API');
    }
  }

  useEffect(() => {
    filtrar();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎟️ Event Radar</Text>
      <TextInput style={styles.input} placeholder="Ciudad" value={ciudad} onChangeText={setCiudad} />
      <Button title="Buscar eventos" onPress={filtrar} />
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <FlatList
        style={styles.lista}
        data={eventos}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text>No hay eventos para este filtro</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>🎟️ {item.nombre}</Text>
            <Text>{item.ciudad} · {item.categoria}</Text>
            <Text style={styles.fecha}>{item.fecha}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FDF4FF' },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 16 },
  input: { backgroundColor: '#FFF', padding: 12, borderRadius: 10, marginBottom: 10 },
  error: { color: '#DC2626', marginTop: 8 },
  lista: { marginTop: 16 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 14, marginBottom: 10 },
  nombre: { fontSize: 17, fontWeight: '700' },
  fecha: { marginTop: 4, color: '#A21CAF', fontWeight: '700' },
});
