import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, Alert, StyleSheet
} from 'react-native';
import { supabase } from '../services/supabase';
export default function Screen3() {
  const [id, setId]             = useState<string>('');
  const [nombre, setNombre]     = useState<string>('');
  const [marca, setMarca]       = useState<string>('');
  const [precio, setPrecio]     = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const buscar = async () => {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', parseInt(id))
      .single();
    if (error) {
      Alert.alert('No encontrado');
    } else {
      setNombre(data.nombre);
      setMarca(data.marca);
      setPrecio(data.precio.toString());
      setDescripcion(data.descripcion);
    }
  };
  const editar = async () => {
    const { error } = await supabase
      .from('productos')
      .update({
        nombre,
        marca,
        precio: parseFloat(precio),
        descripcion,
      })
      .eq('id', parseInt(id));
    if (error) {
      Alert.alert('Error al editar');
    } else {
      Alert.alert('Éxito', 'Registro editado');
    }
  };
  const eliminar = () => {
    Alert.alert('Confirmar eliminación', '¿Eliminar este producto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await supabase.from('productos').delete().eq('id', parseInt(id));
          Alert.alert('Eliminado');
          setId(''); setNombre(''); setMarca(''); setPrecio(''); setDescripcion('');
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Text>Buscar ID:</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />
      <Button title="Buscar" onPress={buscar} />
      <Text style={{ marginTop: 20 }}>Nombre:</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
      <Text>Marca:</Text>
      <TextInput style={styles.input} value={marca} onChangeText={setMarca} />
      <Text>Precio:</Text>
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />
      <Text>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Button title="Editar" onPress={editar} />
      <View style={{ marginTop: 10 }}>
        <Button title="Eliminar" color="red" onPress={eliminar} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderRadius: 4, padding: 8, marginBottom: 12 },
});
