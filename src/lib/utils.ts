import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { playSound } from "./sounds";
import helpers from "./helper";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getMousePosition(e : MouseEvent | DragEvent | React.MouseEvent<HTMLDivElement, MouseEvent>, boardPosition: any) {
  const { x, y, sideSize } = boardPosition;
  const row = helpers.clamp(Math.floor((e.clientX - x) / sideSize), 0, 7);
  const col = helpers.clamp(Math.floor((e.clientY - y) / sideSize), 0, 7);
  return (helpers.getPositionFromRowAndCol(row, col))
}

export const getClickTragetUpdate = (setTargetPosition : any, boardPosition : any) => {
  return (e : React.MouseEvent<HTMLDivElement>) => {setTargetPosition(getMousePosition(e, boardPosition));}
}

export const getPieceEventHandlers = (setCurrentPosition : any, setTargetPosition : any, boardPosition : any) => {
  let handleDrag = (e : React.DragEvent<HTMLDivElement>) => {setCurrentPosition(getMousePosition(e, boardPosition));}
  let handleDrop = (e : React.DragEvent<HTMLDivElement>) => {setTargetPosition(getMousePosition(e, boardPosition));}
  let handleClick = (e : React.MouseEvent<HTMLDivElement>) => {setCurrentPosition(getMousePosition(e, boardPosition));}
  return { handleDrag, handleDrop, handleClick };
}

export function getMoveFunction(setPieces: React.Dispatch<React.SetStateAction<Piece[]>>){
  let move = (from: string,to: string, _flag: number  = 0) => {
    setPieces(prevPieces => {
      const pieceIndex = prevPieces.findIndex(piece => piece.position === from);
      if (pieceIndex === -1) return prevPieces;
      const captureIndex = prevPieces.findIndex(piece => piece.position == to);
      playSound(captureIndex == -1 ? "move" : "capture")

      const promotionTypes: Record<number, PieceType> = {
        3: "queen",
        4: "knight",
        5: "rook",
        6: "bishop",
      };

      return prevPieces.map((piece, index) =>
        index === pieceIndex ? { ...piece, position: to, type: promotionTypes[_flag] || piece.type } : piece
      );
    });
  }
  return move
}

export function getUpdatePiecesFromFENFunction(setPieces: React.Dispatch<React.SetStateAction<Piece[]>>){
  let updatePiecesFromFEN = (newFEN: string) => {
    playSound("move")
    setPieces(helpers.getPiecesFromFEN(newFEN));
  }
  return updatePiecesFromFEN
}