import helpers from '@/lib/helper';
import { getPieceIcon } from '@/lib/images';

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
  
  let {row, col} = helpers.getRowAndColFromPosition(position);

  return (
    <div 
      style={{top: `${(isFlipped ? 7 - row : row) * 12.5}%`, left: `${(isFlipped ? 7 - col : col) * 12.5}%`, backgroundImage: `url(${getPieceIcon(isWhite, type)})`, imageRendering: `auto`}}
      className="tile absolute bg-contain bg-no-repeat z-50" 
      draggable 
      onDragStart={handlers.handleDrag} 
      onDragEnd={handlers.handleDrop} 
      onClick={handlers.handleClick}>
    </div>
  )
}