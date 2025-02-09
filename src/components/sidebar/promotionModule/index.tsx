import whiteKnight  from '../../../assets/images/WhiteKnight.png';
import whiteBishop from '../../../assets/images/WhiteBishop.png';
import whiteRook from '../../../assets/images/WhiteRook.png';
import whiteQueen from '../../../assets/images/WhiteQueen.png';

import blackKnight  from '../../../assets/images/BlackKnight.png';
import blackBishop from '../../../assets/images/BlackBishop.png';
import blackRook from '../../../assets/images/BlackRook.png';
import blackQueen from '../../../assets/images/BlackQueen.png';

import { PromotionOption } from './PromotionOption';

interface PromotionModuleProps {
  isWhite: boolean;
  promotionOptions: { move: Move; from: string; to: string;}[];
  handleMove: (foundMove: Move, from: string, to: string, flag?: number) => void;
}

export const PromotionModule = ({ isWhite, promotionOptions, handleMove } : PromotionModuleProps) => {

  const pieces = isWhite ? [whiteRook, whiteQueen, whiteBishop, whiteKnight] : [blackRook, blackQueen, blackBishop, blackKnight];
  const indexNormalization: { [key: number]: number } = { 0: 2, 1: 0, 2: 3, 3: 1 };

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 aspect-square text-white w-[60%]">
      {pieces.map((piece, index) => {
        const { move, from, to } = promotionOptions[indexNormalization[index]];
        return (
          <PromotionOption key={index} piece={piece} onClick={() => {handleMove(move, from, to, move.flag)}}/>
        )
      })}
    </div>
  )
}