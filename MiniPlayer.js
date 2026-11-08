import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from './theme';
import { togglePlay } from './player';

const { colors, radius, spacing } = theme;

export default function MiniPlayer({ track, isPlaying, progress, onOpen }) {
  if (!track) return null;
  return (
    <TouchableOpacity style={styles.bar} activeOpacity={0.9} onPress={onOpen}>
      <Image source={{ uri: track.image }} style={styles.art} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{track.name}</Text>
        <Text style={styles.artist} numberOfLines={1}>{track.artist_name}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={togglePlay}>
        <Text style={styles.icon}>{isPlaying ? '❚❚' : '▶'}</Text>
      </TouchableOpacity>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${(progress || 0) * 100}%` }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute', left: spacing.md, right: spacing.md, bottom: spacing.md,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.creamDark, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.accent,
    padding: spacing.sm, overflow: 'hidden',
    shadowColor: colors.brownDeep, shadowOpacity: 0.15, shadowRadius: 12, elevation: 6
  },
  art: { width: 44, height: 44, borderRadius: radius.sm },
  info: { flex: 1, marginLeft: 10 },
  title: { color: colors.brownDeep, fontSize: 13.5, fontWeight: '700' },
  artist: { color: colors.brownLight, fontSize: 11.5, marginTop: 2 },
  btn: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.brown,
    alignItems: 'center', justifyContent: 'center'
  },
  icon: { color: colors.cream, fontSize: 11 },
  progressTrack: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: colors.divider },
  progressFill: { height: 2, backgroundColor: colors.accent }
});
