import { useEffect, useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

type Destino = {
  id: number;
  ciudad: string;
  pais: string;
  descripcion: string;
};

const API_URL = 'http://192.168.104.66:3000';

export default function App() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  async function request(url: string, options?: RequestInit) {
    const respuesta = await fetch(url, options);
    if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);
    return respuesta;
  }

  async function cargar() {
    try {
      const respuesta = await request(API_URL + '/destinos');
      setDestinos(await respuesta.json());
      setError('');
    } catch {
      setError('No se pudieron cargar los destinos');
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  async function crear() {
    try {
      await request(API_URL + '/destinos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ciudad, pais, descripcion }),
      });
      setCiudad('');
      setPais('');
      setDescripcion('');
      await cargar();
    } catch {
      setError('No se pudo crear el destino');
    }
  }

  async function eliminar(id: number) {
    try {
      await request(API_URL + '/destinos/' + id, { method: 'DELETE' });
      await cargar();
    } catch {
      setError('No se pudo eliminar el destino');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🌍 Wander</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TextInput style={styles.input} placeholder="Ciudad" value={ciudad} onChangeText={setCiudad} />
      <TextInput style={styles.input} placeholder="País" value={pais} onChangeText={setPais} />
      <TextInput style={styles.input} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />
      <Button title="Crear destino" onPress={crear} />

      <FlatList
        style={styles.lista}
        data={destinos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.ciudad}>🌍 {item.ciudad}</Text>
            <Text style={styles.pais}>{item.pais}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
            <Button title="Eliminar" color="#DC2626" onPress={() => eliminar(item.id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ECFDF5' },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 12 },
  error: { color: '#DC2626', marginBottom: 8 },
  input: { backgroundColor: '#FFF', padding: 12, borderRadius: 10, marginBottom: 8 },
  lista: { marginTop: 16 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 12 },
  ciudad: { fontSize: 18, fontWeight: '700' },
  pais: { color: '#047857', fontWeight: '700', marginTop: 2 },
  descripcion: { marginTop: 6, marginBottom: 10 },
});
