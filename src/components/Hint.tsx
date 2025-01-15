import helpers from '@/lib/helper';
import { cn } from '@/lib/utils';

interface MoveHintProps {
  type: string;
  index: number;
  isBlack: boolean;
}

export const MoveHint = ({type, index, isBlack} : MoveHintProps) => {
  if(isBlack)
    index = 63 - index
  let convertedPosition = helpers.getRowAndColFromIndex(index);

  const top = `${convertedPosition.row * 12.5}%`;
  const left = `${convertedPosition.col * 12.5}%`;

  return (
    <div style={{top,left}} className="tile absolute bg-contain z-1">
      <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/30 w-[50%] aspect-square rounded-full")}/>
    </div>
  )
}