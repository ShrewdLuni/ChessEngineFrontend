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
  pieceType : "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"
  isWhite : boolean
  handleDrop : any
}

export const Piece = ({pieceType, isWhite, handleDrop} : PieceProps) => {
  let white = {"pawn":whitePawn,"knight":whiteKnight,"bishop":whiteBishop,"rook":whiteRook,"queen":whiteQueen,"king":whiteKing}
  let black = {"pawn":blackPawn,"knight":blackKnight,"bishop":blackBishop,"rook":blackRook,"queen":blackQueen,"king":blackKing}
  let piece = isWhite ? white[pieceType] : black[pieceType]


  return (
    <div className="" draggable onDragEnd={handleDrop}>
      <img src={piece} alt="pawn" className="h-[92px] aspect-square cursor-grab"/>
    </div>
  )
}