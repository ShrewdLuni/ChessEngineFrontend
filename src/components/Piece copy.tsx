import whitePawn from '../assets/WhitePawn.png'
import whiteKnight  from '../assets/WhiteKnight.png'
import whiteBishop from '../assets/WhiteBishop.png'
import whiteRook from '../assets/WhiteRook.png'
import whiteQueen from '../assets/WhiteQueen.png'
import whiteKing from '../assets/WhiteKing.png'

import blackPawn from '../assets/BlackPawn.png'
import blackKnight  from '../assets/BlackKnight.png'
import blackBishop from '../assets/BlackBishop.png'
import blackRook from '../assets/BlackRook.png'
import blackQueen from '../assets/BlackQueen.png'
import blackKing from '../assets/BlackKing.png'

interface PieceCopyProps {
  type: "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"
  isWhite: boolean
  position: string
  handlers: {
    handleDrag: any
    handleDrop: any
    handleClick: any
  }
}

export const PieceCopy = ({type, isWhite, position, handlers} : PieceCopyProps) => {
  const white = {"pawn": whitePawn, "knight": whiteKnight, "bishop": whiteBishop, "rook": whiteRook, "queen": whiteQueen, "king": whiteKing}
  const black = {"pawn": blackPawn, "knight": blackKnight, "bishop": blackBishop, "rook": blackRook, "queen": blackQueen, "king": blackKing}
  const piece = isWhite ? white[type] : black[type]

  const col = position.charCodeAt(0) - 'a'.charCodeAt(0); // 'a' -> 0, 'b' -> 1, etc.
  const row = 8 - parseInt(position[1]); // '1' -> 7 (top row), '8' -> 0 (bottom row)

  const top = `${row * 12.5}%`;
  const left = `${col * 12.5}%`;

  return (
    <div style={{top,left}} className="tile absolute bg-contain z-50" draggable onDragStart={handlers.handleDrag} onDragEnd={handlers.handleDrop} onClick={handlers.handleClick}>
      <img src={piece} alt="pawn" className="w-full h-full aspect-square cursor-grab"/>
    </div>
  )
}