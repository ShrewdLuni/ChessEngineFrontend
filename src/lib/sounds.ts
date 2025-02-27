import move from '../assets/sounds/move.mp3'
import capture from '../assets/sounds/capture.mp3'
import gameover from '../assets/sounds/gameover.mp3'
import { debounce } from 'lodash';

const KEY_SOUND = {
  "move": move,
  "capture": capture,
  "gameover": gameover,
}

export const getSound = (sound: sound) => {
  return KEY_SOUND[sound]
}

export const playSound = debounce((soundName : sound) => {
  const sound = new Audio(KEY_SOUND[soundName]);
  sound.play();
}, 100);