import { type ClassValue, clsx } from "clsx"
import { debounce } from "lodash";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const playSound = debounce((source : string) => {
  const sound = new Audio(source);
  sound.play();
}, 100);