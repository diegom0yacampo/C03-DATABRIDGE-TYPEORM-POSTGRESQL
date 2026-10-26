import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

type Viaje = {
  id: number;
  destino: string;
  pais: string;
  fecha: string;
  estado: string;
};

const API_URL = 'http://192.168.104.66:3000';

export default function App() {
  const [estado, setEstado] = useState('RESERVADO');
  const [viaje, setViaje] = useState<Viaje | null>(null);
  const [mensaje, setMensaje] = useState('');

  async function actualizar() {
    try {
      const respuesta = await fetch(API_URL + '/viajes/1', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado }),
      });

      if (!respuesta.ok) {
        setMensaje('No se pudo actualizar (' + respuesta.status + ')');
        return;
      }

      const actualizado: Viaje = await respuesta.json();
      setViaje(actualizado);
      setMensaje('Viaje actualizado ✓');
    } catch {
      setMensaje('No se pudo conectar con la API');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>✈️ Travel Book</Text>
      <Text style={styles.label}>Estado del viaje</Text>
      <TextInput
        style={styles.input}
        value={estado}
        onChangeText={setEstado}
        autoCapitalize="characters"
      />
      <Button title="Guardar cambios" onPress={actualizar} />
      <Text style={styles.mensaje}>{mensaje}</Text>

      {viaje && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✈️ {viaje.destino}</Text>
          <Text>{viaje.pais} · {viaje.estado}</Text>
          <Text style={styles.fecha}>📅 {viaje.fecha}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F0F9FF' },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 20 },
  label: { fontWeight: '700', marginBottom: 6 },
  input: { backgroundColor: '#FFF', padding: 14, borderRadius: 12, marginBottom: 12 },
  mensaje: { marginTop: 12 },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, marginTop: 16 },
  cardTitle: { fontSize: 20, fontWeight: '800' },
  fecha: { marginTop: 8, color: '#0369A1', fontWeight: '700' },
});
