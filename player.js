import { Audio } from 'expo-av';

let sound = null;

export async function playTrack(audioUrl, onStatus) {
  if (sound) await sound.unloadAsync();
  const result = await Audio.Sound.createAsync({ uri: audioUrl });
  sound = result.sound;
  sound.setOnPlaybackStatusUpdate(onStatus);
  await sound.playAsync();
}

export async function togglePlay() {
  if (!sound) return;
  const status = await sound.getStatusAsync();
  status.isPlaying ? await sound.pauseAsync() : await sound.playAsync();
}

export async function stopTrack() {
  if (sound) { await sound.unloadAsync(); sound = null; }
}
