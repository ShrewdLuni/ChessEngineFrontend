import pawn from '../assets/WhitePawn.png'

interface PieceProps {
  handleDrop : any
}

export const Piece = ({handleDrop} : PieceProps) => {
  return (
    <div className="" draggable onDragEnd={handleDrop}>
      <img src={pawn} alt="pawn" className="h-[92px] aspect-square cursor-grab"/>
    </div>
  )
}