import { cn } from "@/lib/utils"
import '../assets/tile.css';

interface TileProps{
  isWhite: boolean
  piece: JSX.Element | null
}

export const Tile = ({isWhite,piece} : TileProps) => {

  return (
    <div className={cn("tile", "flex justify-center items-center aspect-square hover:border-solid hover:border-[#fffaf6] hover:border-[4px] hover:rounded-sm transition-all duration-100",isWhite ? "bg-[#8c8fbc]" : "bg-[#1a1e23]")} >
      {piece}
    </div>
  )
}