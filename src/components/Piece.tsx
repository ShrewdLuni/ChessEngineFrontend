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

interface PieceProps {
  pieceType: "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"
  isWhite: boolean
  handleDrag: any
  handleDrop: any
}

export const Piece = ({pieceType, isWhite, handleDrag, handleDrop} : PieceProps) => {
  const white = {"pawn": whitePawn, "knight": whiteKnight, "bishop": whiteBishop, "rook": whiteRook, "queen": whiteQueen, "king": whiteKing}
  const black = {"pawn": blackPawn, "knight": blackKnight, "bishop": blackBishop, "rook": blackRook, "queen": blackQueen, "king": blackKing}
  const piece = isWhite ? white[pieceType] : black[pieceType]


  return (
    <div className="bg-contain w-full h-full z-50" draggable onDragStart={handleDrag} onDragEnd={handleDrop}>
      <img src={piece} alt="pawn" className="w-full h-full aspect-square cursor-grab" draggable onDragStart={handleDrag} onDragEnd={handleDrop}/>
    </div>
  )
}