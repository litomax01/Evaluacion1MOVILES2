// screens/Screen1.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../services/supabase';

export default function Screen1() {
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  async function agregarProducto() {
    // 1) Validar campos no vacíos
    if (!nombre || !marca || !precio || !descripcion) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    // 2) Validar precio numérico
    const precioNum = parseFloat(precio);
    if (isNaN(precioNum)) {
      Alert.alert('Error', 'El precio debe ser un número válido');
      return;
    }
    // 3) Insertar en Supabase
    const { error } = await supabase
      .from('productos')
      .insert([{ nombre, marca, precio: precioNum, descripcion }]);

    // 4) Mostrar resultado
    if (error) {
      Alert.alert('Error al agregar', error.message);
    } else {
      Alert.alert('Éxito', 'Producto agregado correctamente');
      // Limpiar campos
      setNombre('');
      setMarca('');
      setPrecio('');
      setDescripcion('');
    }
  }

  return (
    <View style={{ padding: 16 }}>
      <Text>Nombre:</Text>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        style={{ borderWidth: 1, marginBottom: 12 }}
      />

      <Text>Marca:</Text>
      <TextInput
        value={marca}
        onChangeText={setMarca}
        style={{ borderWidth: 1, marginBottom: 12 }}
      />

      <Text>Precio:</Text>
      <TextInput
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 12 }}
      />

      <Text>Descripción:</Text>
      <TextInput
        value={descripcion}
        onChangeText={setDescripcion}
        style={{ borderWidth: 1, marginBottom: 12 }}
      />

      <Button title="Agregar Producto" onPress={agregarProducto} />
    </View>
  );
}
