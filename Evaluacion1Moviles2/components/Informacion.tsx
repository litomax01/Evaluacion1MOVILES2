import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent
} from 'react-native';
type Props = {
  id: number;
  nombre: string;
  marca?: string;
  precio?: number;
  descripcion?: string;
  onPress?: (event: GestureResponderEvent) => void;
};
export default function Informacion({
  id, nombre, marca, precio, descripcion, onPress,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.card}>
        <Text>ID: {id}</Text>
        <Text>Nombre: {nombre}</Text>
        {marca && <Text>Marca: {marca}</Text>}
        {precio !== undefined && <Text>Precio: {precio}</Text>}
        {descripcion && <Text>Descripción: {descripcion}</Text>}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
});
