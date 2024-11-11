import { type ClassValue, clsx } from "clsx"
import { debounce } from "lodash";
import { twMerge } from "tailwind-merge"
import helpers from "./helper";
import moveSound from '../assets/sounds/move.mp3';
import captureSound from '../assets/sounds/capture.mp3'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const playSound = debounce((source : string) => {
  const sound = new Audio(source);
  sound.play();
}, 100);

function getMousePosition(e : MouseEvent | DragEvent | React.MouseEvent<HTMLDivElement, MouseEvent>, boardPosition: any) {
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

export function getMoveFunction(setPieces: React.Dispatch<React.SetStateAction<Piece[]>>){
  let move = (from: string,to: string, _flag: number  = 0) => {
    setPieces(prevPieces => {
      const pieceIndex = prevPieces.findIndex(piece => piece.position === from);
      if (pieceIndex === -1) return prevPieces;
      const captureIndex = prevPieces.findIndex(piece => piece.position == to);
      playSound(captureIndex == -1 ? moveSound : captureSound)
      return prevPieces.map((piece, index) =>
        index === pieceIndex ? { ...piece, position: to } : piece
      );
    });
  }
  return move
}

export function getUpdatePiecesFromFENFunction(setPieces: React.Dispatch<React.SetStateAction<Piece[]>>){
  let updatePiecesFromFEN = (newFEN: string) => {
    playSound(moveSound)
    setPieces(helpers.getPiecesFromFEN(newFEN));
  }
  return updatePiecesFromFEN
}