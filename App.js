import { useState, useEffect } from 'react';
import { FlatList, Text, Image, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import { theme } from './theme';
import { playTrack } from './player';

const CLIENT_ID = process.env.EXPO_PUBLIC_JAMENDO_CLIENT_ID;
const { colors, radius, spacing } = theme;

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=20&include=musicinfo&audioformat=mp32`)
      .then((r) => r.json())
      .then((data) => setTracks(data.results));
  }, []);

  async function handlePlay(track) {
    setCurrentId(track.id);
    await playTrack(track.audio, () => {});
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.kicker}>NOW SPINNING</Text>
      <Text style={styles.header}>Your Daily Brew</Text>
      <Text style={styles.sub}>Handpicked tracks, slow mornings.</Text>

      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePlay(item)} activeOpacity={0.8}>
            <Text style={styles.index}>{String(index + 1).padStart(2, '0')}</Text>
            <Image source={{ uri: item.image }} style={styles.art} />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.artist} numberOfLines={1}>{item.artist_name}</Text>
            </View>
            <View style={[styles.playBtn, currentId === item.id && styles.playBtnActive]}>
              <Text style={[styles.playIcon, currentId === item.id && { color: colors.cream }]}>
                {currentId === item.id ? '❚❚' : '▶'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, paddingTop: 70, paddingHorizontal: spacing.lg },
  kicker: { color: colors.accent, fontSize: 11, letterSpacing: 2, fontWeight: '700', marginBottom: 6 },
  header: { color: colors.brownDeep, fontSize: 30, fontWeight: '800', letterSpacing: -0.5 },
  sub: { color: colors.brownLight, fontSize: 14, marginTop: 4, marginBottom: 22 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.creamDark,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1, borderColor: colors.divider
  },
  index: { width: 26, color: colors.brownLight, fontSize: 12, fontWeight: '600' },
  art: { width: 52, height: 52, borderRadius: radius.sm, backgroundColor: colors.divider },
  info: { flex: 1, marginLeft: 12 },
  title: { color: colors.brownDeep, fontSize: 15, fontWeight: '700' },
  artist: { color: colors.brownLight, fontSize: 12.5, marginTop: 3 },
  playBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.cream,
    borderWidth: 1, borderColor: colors.accent,
    alignItems: 'center', justifyContent: 'center'
  },
  playBtnActive: { backgroundColor: colors.brown },
  playIcon: { color: colors.brown, fontSize: 12 }
});
