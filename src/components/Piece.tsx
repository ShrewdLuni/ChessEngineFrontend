import whitePawn from '../assets/images/WhitePawn.png';
import whiteKnight  from '../assets/images/WhiteKnight.png';
import whiteBishop from '../assets/images/WhiteBishop.png';
import whiteRook from '../assets/images/WhiteRook.png';
import whiteQueen from '../assets/images/WhiteQueen.png';
import whiteKing from '../assets/images/WhiteKing.png';

import blackPawn from '../assets/images/BlackPawn.png';
import blackKnight  from '../assets/images/BlackKnight.png';
import blackBishop from '../assets/images/BlackBishop.png';
import blackRook from '../assets/images/BlackRook.png';
import blackQueen from '../assets/images/BlackQueen.png';
import blackKing from '../assets/images/BlackKing.png';

import helpers from '@/lib/helper';

interface PieceProps {
  type: PieceType;
  isWhite: boolean;
  position: string;
  handlers: {
    handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
  isFlipped: boolean;
}

export const Piece = ({type, isWhite, position, handlers, isFlipped} : PieceProps) => {
  const white = { "pawn": whitePawn, "knight": whiteKnight, "bishop": whiteBishop, "rook": whiteRook, "queen": whiteQueen, "king": whiteKing };
  const black = { "pawn": blackPawn, "knight": blackKnight, "bishop": blackBishop, "rook": blackRook, "queen": blackQueen, "king": blackKing} ;
  const piece = isWhite ? white[type] : black[type];

  let {row, col} = helpers.getRowAndColFromPosition(position);

  return (
    <div 
      style={{top: `${(isFlipped ? 7 - row : row) * 12.5}%`, left: `${(isFlipped ? 7 - col : col) * 12.5}%`, backgroundImage: `url(${piece})`, imageRendering: `auto`}}
      className="tile absolute bg-contain bg-no-repeat z-50" 
      draggable 
      onDragStart={handlers.handleDrag} 
      onDragEnd={handlers.handleDrop} 
      onClick={handlers.handleClick}>
    </div>
  )
}