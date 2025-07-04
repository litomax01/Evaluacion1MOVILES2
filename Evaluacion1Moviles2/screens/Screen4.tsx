import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
type VideoGame = {
  titulo: string;
  plataforma: string[];
  genero: string[];
  desarrollador: string;
  precio: number;
  lanzamiento: string;
  descripcion: string;
  imagen: string;
};
export default function Screen4() {
  const [videoGames, setVideoGames] = useState<VideoGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchGames() {
    try {
      const res = await fetch(
        'https://jritsqmet.github.io/web-api/video_juegos.json'
      );
      const payload = await res.json();
      setVideoGames(payload.videojuegos);
    } catch (e) {
      console.error('Fetch error:', e);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchGames();
  }, []);
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <FlatList
      data={videoGames}
      keyExtractor={(_, idx) => `game-${idx}`}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.8}>
          <Image source={{ uri: item.imagen }} style={styles.thumbnail} />
          <View style={styles.textBlock}>
            <Text style={styles.headline}>{item.titulo}</Text>
            <Text style={styles.meta}>By {item.desarrollador}</Text>
            <Text style={styles.meta}>${item.precio.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  textBlock: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  headline: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: '#555',
  },
});
