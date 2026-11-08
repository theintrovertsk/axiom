import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { theme } from './theme';
import { togglePlay, seekTo } from './player';

const { colors, radius, spacing } = theme;
const { width } = Dimensions.get('window');

export default function FullPlayer({ track, isPlaying, position, duration, onClose }) {
  if (!track) return null;
  const progress = duration ? position / duration : 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <Text style={styles.closeIcon}>⌄</Text>
      </TouchableOpacity>

      <Text style={styles.kicker}>NOW PLAYING</Text>
      <Image source={{ uri: track.image }} style={styles.art} />

      <Text style={styles.title} numberOfLines={1}>{track.name}</Text>
      <Text style={styles.artist} numberOfLines={1}>{track.artist_name}</Text>

      <TouchableOpacity
        style={styles.seekArea}
        onPress={(e) => {
          const x = e.nativeEvent.locationX;
          seekTo((x / (width - spacing.lg * 2)) * duration);
        }}
      >
        <View style={styles.seekTrack}>
          <View style={[styles.seekFill, { width: `${progress * 100}%` }]} />
        </View>
      </TouchableOpacity>
      <View style={styles.timeRow}>
        <Text style={styles.time}>{formatTime(position)}</Text>
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>

      <TouchableOpacity style={styles.playBtn} onPress={togglePlay}>
        <Text style={styles.playIcon}>{isPlaying ? '❚❚' : '▶'}</Text>
      </TouchableOpacity>
    </View>
  );
}

function formatTime(ms) {
  if (!ms) return '0:00';
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, padding: spacing.lg, paddingTop: 60, alignItems: 'center' },
  close: { alignSelf: 'flex-start', padding: 6 },
  closeIcon: { color: colors.brown, fontSize: 30 },
  kicker: { color: colors.accent, fontSize: 11, letterSpacing: 3, fontWeight: '700', marginTop: 10 },
  art: { width: width - spacing.lg * 2, height: width - spacing.lg * 2, borderRadius: radius.lg, marginTop: 20 },
  title: { color: colors.brownDeep, fontSize: 22, fontWeight: '800', marginTop: 22, textAlign: 'center' },
  artist: { color: colors.brownLight, fontSize: 14, marginTop: 6 },
  seekArea: { width: '100%', marginTop: 26 },
  seekTrack: { height: 4, borderRadius: 2, backgroundColor: colors.divider, overflow: 'hidden' },
  seekFill: { height: 4, backgroundColor: colors.brown },
  timeRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  time: { color: colors.brownLight, fontSize: 11 },
  playBtn: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: colors.brown,
    alignItems: 'center', justifyContent: 'center', marginTop: 30
  },
  playIcon: { color: colors.cream, fontSize: 22 }
});
