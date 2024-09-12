import whitePawn from '../assets/WhitePawn.png';
import whiteKnight  from '../assets/WhiteKnight.png';
import whiteBishop from '../assets/WhiteBishop.png';
import whiteRook from '../assets/WhiteRook.png';
import whiteQueen from '../assets/WhiteQueen.png';
import whiteKing from '../assets/WhiteKing.png';

import blackPawn from '../assets/BlackPawn.png';
import blackKnight  from '../assets/BlackKnight.png';
import blackBishop from '../assets/BlackBishop.png';
import blackRook from '../assets/BlackRook.png';
import blackQueen from '../assets/BlackQueen.png';
import blackKing from '../assets/BlackKing.png';

import helpers from '@/lib/helper';

import '../assets/board.css';
import { cn } from '@/lib/utils';

interface PieceProps {
  type: PieceType;
  isWhite: boolean;
  position: string;
  handlers: {
    handleDrag: any;
    handleDrop: any;
    handleClick: any;
  };
}

export const Piece = ({type, isWhite, position, handlers} : PieceProps) => {
  const white = {"pawn": whitePawn, "knight": whiteKnight, "bishop": whiteBishop, "rook": whiteRook, "queen": whiteQueen, "king": whiteKing};
  const black = {"pawn": blackPawn, "knight": blackKnight, "bishop": blackBishop, "rook": blackRook, "queen": blackQueen, "king": blackKing};
  const piece = isWhite ? white[type] : black[type];

  let convertedPosition = helpers.getRowAndColFromPosition(position);

  const top = `${convertedPosition.row * 12.5}%`;
  const left = `${convertedPosition.col * 12.5}%`;

  return (
    <div style={
      {top,left,backgroundImage: `url(${piece})`,backgroundRepeat: `no-repeat`, imageRendering:`auto`}} className={cn("tile bgImage"," absolute bg-contain z-50 bg-[set piece here]")} draggable onDragStart={handlers.handleDrag} onDragEnd={handlers.handleDrop} onClick={handlers.handleClick}>
    </div>
  )
}