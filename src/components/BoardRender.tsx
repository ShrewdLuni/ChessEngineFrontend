import { Piece } from "./Piece";
import { MoveHint } from "./Hint";

interface BoardRenderProps {
  boardRef: React.RefObject<HTMLDivElement>;
  isFlipped: boolean;
  tiles: JSX.Element[];
  pieces: Piece[];
  moveHints: { 
    starting_square: number; 
    target_square: number;
  }[] | null | undefined;

  pieceEventHandlers: {
    handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  };

  onTargetClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const BoardRender = ({boardRef, isFlipped, tiles, pieces, moveHints, pieceEventHandlers, onTargetClick} : BoardRenderProps) => {

  // const rank = isFlipped ? ["h", "g", "f", "e", "d", "c", "b", "a"] : ["a", "b", "c", "d", "e", "f", "g", "h"];
  // const file = isFlipped ? ["1", "2", "3", "4", "5", "6", "7", "8"] : ["8", "7", "6", "5", "4", "3", "2", "1"];

  return (
    <div className="flex flex-row w-full sm:w-auto justify-center">
        <div id="Board" ref={boardRef} className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1">
          {tiles}
          {pieces.map((piece, key) => <Piece key={key} type={piece.type} position={piece.position} isWhite={piece.isWhite} isFlipped={isFlipped} handlers={pieceEventHandlers}/>)}
          {moveHints?.map((hint, key) => <MoveHint key={key} type="" index={hint.target_square} isFlipped={isFlipped} onClick={onTargetClick}/>)}
        </div>
    </div>
  )
}