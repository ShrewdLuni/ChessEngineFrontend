import { cn } from "@/lib/utils"
import '../assets/board.css';

interface TileProps{
  isWhite: boolean
  isPossible: boolean
  piece: JSX.Element | null
}

export const Tile = ({isWhite, isPossible, piece} : TileProps) => {
  console.log(isPossible)
  return (
    <div className={cn("tile", "relative flex justify-center items-center aspect-square hover:border-solid hover:border-[#fffaf6] hover:border-[4px] hover:rounded-sm transition-all duration-100",isWhite ? "bg-[#8c8fbc]" : "bg-[#1a1e23]")} >
      {piece}
      <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/30 w-[50%] aspect-square rounded-full",isPossible ? "block" : "hidden")}/>
    </div>
  )
}