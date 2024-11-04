import { type ClassValue, clsx } from "clsx"
import { debounce } from "lodash";
import { twMerge } from "tailwind-merge"
import helpers from "./helper";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const playSound = debounce((source : string) => {
  const sound = new Audio(source);
  sound.play();
}, 100);

function getMousePosition(e : MouseEvent | DragEvent | React.MouseEvent<HTMLDivElement, MouseEvent>, boardPosition: any) {
  console.log("hellow,me")
  const { x, y, sideSize } = boardPosition;
  const row = helpers.clamp(Math.floor((e.clientX - x) / sideSize), 0, 7);
  const col = helpers.clamp(Math.floor((e.clientY - y) / sideSize), 0, 7);
  return(helpers.getPositionFromRowAndCol(row, col))
}

export const getPieceEventHandlers = (setCurrentPosition : any, setTargetPosition : any, boardPosition : any) => {
  let handleDrag = (e : DragEvent) => {setCurrentPosition(getMousePosition(e, boardPosition));}
  let handleDrop = (e : DragEvent) => {setTargetPosition(getMousePosition(e, boardPosition));}
  let handleClick = (e : MouseEvent) => {setCurrentPosition(getMousePosition(e, boardPosition));}
  return {handleDrag, handleDrop, handleClick};
}