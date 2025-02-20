import { PromotionOption } from './PromotionOption';
import { getPieceIcon } from '@/lib/images';

interface PromotionModuleProps {
  isWhite: boolean;
  promotionOptions: { move: Move; from: string; to: string;}[];
  handleMove: (foundMove: Move, from: string, to: string, flag?: number) => void;
}

export const PromotionModule = ({ isWhite, promotionOptions, handleMove } : PromotionModuleProps) => {

  const pieces: any[] = getPieceIcon(isWhite, ["rook", "queen", "bishop", "knight"])
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