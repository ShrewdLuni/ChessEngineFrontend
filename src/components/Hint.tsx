import helpers from '@/lib/helper';

interface MoveHintProps {
  type: string;
  index: number;
  isFlipped: boolean;
}

export const MoveHint = ({ type, index, isFlipped } : MoveHintProps) => {
  let {row, col} = helpers.getRowAndColFromIndex(isFlipped ? 63 - index : index);

  return (
    <div style={{top: `${row * 12.5}%`, left: `${col * 12.5}%`}} className="tile absolute bg-contain z-1">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/30 w-[50%] aspect-square rounded-full"/>
    </div>
  )
}