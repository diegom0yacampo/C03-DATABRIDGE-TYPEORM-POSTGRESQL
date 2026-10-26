import { useEffect, useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

type Sneaker = {
  id: number;
  marca: string;
  modelo: string;
  precio: number;
  talla: number;
};

const API_URL = 'http://192.168.104.66:3000';

export default function App() {
  const [items, setItems] = useState<Sneaker[]>([]);
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [precio, setPrecio] = useState('');
  const [talla, setTalla] = useState('');
  const [error, setError] = useState('');

  async function request(url: string, options?: RequestInit) {
    const respuesta = await fetch(url, options);
    if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);
    return respuesta;
  }

  async function cargar() {
    try {
      const respuesta = await request(API_URL + '/sneakers');
      setItems(await respuesta.json());
      setError('');
    } catch {
      setError('No se pudo conectar con la API');
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  async function crear() {
    try {
      await request(API_URL + '/sneakers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marca,
          modelo,
          precio: Number(precio),
          talla: Number(talla),
        }),
      });
      setMarca('');
      setModelo('');
      setPrecio('');
      setTalla('');
      await cargar();
    } catch {
      setError('Error al crear');
    }
  }

  async function rebajar(item: Sneaker) {
    try {
      await request(API_URL + '/sneakers/' + item.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ precio: Number((Number(item.precio) * 0.9).toFixed(2)) }),
      });
      await cargar();
    } catch {
      setError('Error al actualizar');
    }
  }

  async function eliminar(id: number) {
    try {
      await request(API_URL + '/sneakers/' + id, { method: 'DELETE' });
      await cargar();
    } catch {
      setError('Error al eliminar');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>👟 Sneaker Vault</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Marca" value={marca} onChangeText={setMarca} />
        <TextInput style={styles.input} placeholder="Modelo" value={modelo} onChangeText={setModelo} />
        <TextInput style={styles.input} placeholder="Precio" value={precio} onChangeText={setPrecio} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Talla" value={talla} onChangeText={setTalla} keyboardType="numeric" />
        <Button title="Añadir sneaker" onPress={crear} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.modelo}>👟 {item.modelo}</Text>
            <Text>{item.marca} · Talla {item.talla}</Text>
            <Text style={styles.precio}>{Number(item.precio).toFixed(2)} €</Text>
            <View style={styles.botones}>
              <Button title="Rebajar 10%" onPress={() => rebajar(item)} />
              <Button title="Eliminar" color="#DC2626" onPress={() => eliminar(item.id)} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F4F4F5' },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 12 },
  error: { color: '#DC2626', marginBottom: 8 },
  form: { marginBottom: 16 },
  input: { backgroundColor: '#FFF', padding: 12, borderRadius: 10, marginBottom: 8 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 12 },
  modelo: { fontSize: 18, fontWeight: '700' },
  precio: { marginTop: 6, fontWeight: '700', color: '#15803D' },
  botones: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});
