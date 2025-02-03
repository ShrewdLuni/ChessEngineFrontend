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
  handleMove: any
  promotionOptions: any
}

export const PromotionModule = ({ isWhite, handleMove, promotionOptions } : PromotionModuleProps) => {

  const pieces = isWhite ? [whiteRook, whiteQueen, whiteBishop, whiteKnight] : [blackRook, blackQueen, blackBishop, blackKnight];
  const indexNormalization: { [key: number]: number } = { 0: 3, 1: 0, 2: 2, 3: 1 };

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 aspect-square text-white w-[60%]">
      {pieces.map((piece, index) => <PromotionOption key={index} piece={piece} onClick={() => {handleMove(promotionOptions[indexNormalization[index]].move, promotionOptions[indexNormalization[index]].from, promotionOptions[indexNormalization[index]].to, promotionOptions[indexNormalization[index]].move.flag)}}/>)}
    </div>
  )
}