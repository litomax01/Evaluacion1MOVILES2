import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { supabase } from '../services/supabase';
import Informacion from '../components/Informacion';
type Producto = {
  id: number;
  nombre: string;
  marca?: string;
  precio?: number;
  descripcion?: string;
};
export default function Screen2() {
  const [id, setId] = useState('');
  const [registro, setRegistro] = useState<Producto | null>(null);
  const [lista, setLista] = useState<Producto[]>([]);
  async function buscarPorId() {
    if (id.trim() === '') {
      Alert.alert('Error', 'Ingresa un ID válido');
      return;
    }
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', parseInt(id, 10))
      .single();

    if (error || !data) {
      Alert.alert('No encontrado', `No existe producto con ID ${id}`);
      setRegistro(null);
    } else {
      setRegistro(data);
    }
  }
  async function cargarLista() {
    const { data, error } = await supabase
      .from('productos')
      .select('*');

    if (error || !data) {
      Alert.alert('Error', 'No se pudo cargar la lista');
    } else {
      setLista(data);
    }
  }
  function mostrarDetalles(prod: Producto) {
    Alert.alert(
      prod.nombre,
      `ID: ${prod.id}\nMarca: ${prod.marca}\nPrecio: ${prod.precio}\nDescripción: ${prod.descripcion}`
    );
  }
  return (
    <View style={styles.container}>
      {}
      <Text>Buscar producto por ID:</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />
      <Button title="Buscar" onPress={buscarPorId} />
      {registro && (
        <Informacion
          {...registro}
          onPress={() => mostrarDetalles(registro)}
        />
      )}

      {}
      <View style={{ marginTop: 20 }}>
        <Button title="Cargar lista de productos" onPress={cargarLista} />
      </View>
      <FlatList
        data={lista}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Informacion
            {...item}
            onPress={() => mostrarDetalles(item)}
          />
        )}
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
});
